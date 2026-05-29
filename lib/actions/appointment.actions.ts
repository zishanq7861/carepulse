"use server";

import { revalidatePath } from "next/cache";
import { ID, Query } from "node-appwrite";
import nodemailer from "nodemailer";

import { Appointment } from "@/types/appwrite.types";
import {
  APPOINTMENT_COLLECTION_ID,
  DATABASE_ID,
  databases,
} from "../appwrite.config";
import { formatDateTime, parseStringify } from "../utils";

// SEND PROFESSIONAL EMAIL (Your CodeForge Nodemailer Strategy!)
export const sendEmailNotification = async (
  toEmail: string, 
  emailSubject: string, 
  headerTitle: string,
  salutation: string,
  statusMessage: string,
  buttonText: string,
  buttonUrl: string
) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: '"CarePulse" <no-reply@carepulse.com>',
      to: toEmail,
      subject: emailSubject,
      html: `
      <div style="background-color: #000000; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; min-height: 100%; width: 100%; margin: 0;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 550px; background-color: #0F172A; border: 1px solid #1E293B; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);">
          
          <tr>
            <td style="padding: 32px 40px 20px 40px; text-align: center; border-bottom: 1px solid #1E293B;">
              <h1 style="color: #FFFFFF; font-size: 22px; font-weight: 800; margin: 0; letter-spacing: 1px;">
                CARE<span style="color: #24AE7C;">PULSE</span>
              </h1>
              <p style="color: #64748B; font-size: 10px; margin: 8px 0 0 0; font-weight: 600; text-transform: uppercase; letter-spacing: 2px;">
                HEALTH • TRUST • EFFICIENCY
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding: 40px 40px 30px 40px;">
              <h2 style="color: #FFFFFF; font-size: 20px; font-weight: 700; margin-top: 0; margin-bottom: 16px;">
                ${headerTitle}
              </h2>
              <p style="color: #94A3B8; font-size: 15px; line-height: 24px; margin: 0 0 16px 0;">
                ${salutation}
              </p>
              <p style="color: #94A3B8; font-size: 15px; line-height: 24px; margin: 0 0 32px 0;">
                ${statusMessage}
              </p>
              
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center">
                    <a href="${buttonUrl}" target="_blank" rel="noopener noreferrer" style="background-color: #24AE7C; color: #FFFFFF; font-size: 14px; font-weight: 700; text-decoration: none; padding: 14px 32px; border-radius: 10px; display: inline-block; box-shadow: 0 4px 12px rgba(36, 174, 124, 0.3);">
                      ${buttonText}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding: 0 40px 40px 40px; text-align: center;">
              <p style="color: #334155; font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 2px; margin: 0; border-top: 1px solid #1E293B; padding-top: 24px;">
                SYSTEM NOTICE V1.0 • AUTOMATED DISPATCH
              </p>
            </td>
          </tr>
          
        </table>
      </div>
    `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`🚀 Email Notification [${emailSubject}] Sent Successfully!`);
    return true;
  } catch (error) {
    console.error("An error occurred while sending email via Nodemailer:", error);
  }
};

//  1️⃣ CREATE APPOINTMENT
export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const appointmentData = {
      userId: appointment.userId,
      patients: appointment.patient,
      primaryPhysician: appointment.primaryPhysician,
      schedule: new Date(appointment.schedule),
      reason: appointment.reason,
      status: appointment.status,
      note: appointment.note,
    };

    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointmentData
    );

    const subject = `🚨 New Appointment Request: ${appointment.primaryPhysician}`;
    const headerTitle = "New Booking Request Alert";
    const salutation = "Hello Admin,";
    const statusMessage = `A new appointment request has been submitted for <strong style="color: #FFFFFF;">${appointment.primaryPhysician}</strong>.<br/><br/>Please log into the admin dashboard to review, confirm, or cancel this slot.`;
    const buttonText = "Open Admin Dashboard";
    const buttonUrl = "http://localhost:3000/admin";

    sendEmailNotification(
      "zqureshi088@gmail.com", 
      subject, 
      headerTitle, 
      salutation, 
      statusMessage, 
      buttonText, 
      buttonUrl
    );

    revalidatePath("/admin");
    return parseStringify(newAppointment);
  } catch (error) {
    console.error("An error occurred while creating a new appointment:", error);
  }
};

//  GET RECENT APPOINTMENTS (Now supports compound Name Search AND Status Filter Tab values!)
export const getRecentAppointmentList = async (searchQuery?: string, statusFilter?: string) => {
  try {
    const appointments = await databases.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );

    let documents = appointments.documents;

    // 🚀 1. Filter by Patient Name Search Query if active
    if (searchQuery) {
      documents = documents.filter((appointment: any) => 
        appointment.patients?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 🚀 2. NEW: Filter array elements by matching active category filter tabs
    if (statusFilter && statusFilter !== "all") {
      documents = documents.filter((appointment: any) => 
        appointment.status?.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = (appointments.documents as Appointment[]).reduce(
      (acc, appointment) => {
        switch (appointment.status) {
          case "scheduled":
            acc.scheduledCount++;
            break;
          case "pending":
            acc.pendingCount++;
            break;
          case "cancelled":
            acc.cancelledCount++;
            break;
        }
        return acc;
      },
      initialCounts
    );

    const data = {
      totalCount: documents.length,
      scheduledCount: counts.scheduledCount,
      pendingCount: counts.pendingCount,
      cancelledCount: counts.cancelledCount,
      documents: documents,
    };

    return parseStringify(data);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the recent appointments:",
      error
    );
  }
};

//  2️⃣ UPDATE APPOINTMENT
export const updateAppointment = async ({
  appointmentId,
  userId,
  timeZone,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  try {
    const appointmentData = {
      primaryPhysician: appointment.primaryPhysician,
      schedule: new Date(appointment.schedule!),
      status: appointment.status,
      cancellationReason: appointment.cancellationReason,
      patients: appointment.patient,
    };

    const updatedAppointment = await databases.updateDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      appointmentData
    );

    if (!updatedAppointment) throw Error;

    const subject = type === "schedule" 
      ? "Your Appointment Has Been Scheduled! 🎉" 
      : "CarePulse Appointment Cancellation Notice ⚠️";

    const headerTitle = type === "schedule" 
      ? "Appointment Confirmed" 
      : "Appointment Cancelled";

    const salutation = "Dear Patient,";

    const statusMessage = type === "schedule" 
      ? `We are pleased to inform you that your doctor appointment has been successfully confirmed for <strong style="color: #FFFFFF;">${formatDateTime(appointment.schedule!, timeZone).dateTime} IST</strong> with <strong style="color: #FFFFFF;">${appointment.primaryPhysician}</strong>.<br/><br/>Please make sure to arrive at the medical reception counter at least 15 minutes before your scheduled check-in time.` 
      : `We regret to inform you that your medical appointment scheduled for <strong style="color: #FFFFFF;">${formatDateTime(appointment.schedule!, timeZone).dateTime} IST</strong> has been cancelled.<br/><br/><span style="color: #EF4444; font-weight: 600;">Reason for cancellation:</span> ${appointment.cancellationReason}.`;
    
    const buttonText = "View Patient Portal";
    const buttonUrl = "http://localhost:3000";

    sendEmailNotification(
      "zqureshi088@gmail.com", 
      subject, 
      headerTitle, 
      salutation, 
      statusMessage, 
      buttonText, 
      buttonUrl
    );

    revalidatePath("/admin");
    return parseStringify(updatedAppointment);
  } catch (error) {
    console.error("An error occurred while scheduling an appointment:", error);
  }
};

// GET APPOINTMENT
export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );

    return parseStringify(appointment);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the existing patient:",
      error
    );
  }
};