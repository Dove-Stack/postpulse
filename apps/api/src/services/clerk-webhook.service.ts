// import { prisma } from "@postpulse/db";

// import { ClerkWebhookEvent } from "../types/clerk-webhook";

// export class ClerkWebhookService {
//   async handleEvent(event: ClerkWebhookEvent) {
//     switch (event.type) {
//       case "user.created":
//         return this.handleUserCreated(event);
//       case "user.updated":
//         return this.handleUserUpdated(event);
//       case "user.deleted":
//         return this.handleUserDeleted(event);
//       case "organization.created":
//         return this.handleOrganizationCreated(event);
//       case "organization.updated":
//         return this.handleOrganizationUpdated(event);
//       case "organization.deleted":
//         return this.handleOrganizationDeleted(event);
//       case "organizationMembership.created":
//         return this.handleMembershipCreated(event);
//       case "organizationMembership.deleted":
//         return this.handleMembershipDeleted(event);
//       default:
//         console.log("Unhandled event type:", (event as any).type);
//     }
//   }

//   private async handleUserCreated(
//     event: Extract<ClerkWebhookEvent, { type: "user.created" }>
//   ) {
//     const { id, email_addresses, first_name, last_name, image_url , primary_email_address_id} =
//       event.data;

//     const primaryEmail = email_addresses.find(
//       (e) => e.id === primary_email_address_id[0].id
//     )?.email_address;

//     if (!primaryEmail) {
//       throw new Error("No email address found for user");
//     }

//     try {
//       await prisma.user.create({
//         data: {
//           clerkId: id,
//           email: primaryEmail,
//           firstName: first_name,
//           lastName: last_name,
//           imageUrl: image_url,
//         },
//       });
//       console.log(`User created:${id} (${primaryEmail})`);
//     } catch (error) {
//       console.error("Error handling user.created:", error);
//       throw error;
//     }
//   }

//   private async handleUserUpdated(
//     event: Extract<ClerkWebhookEvent, { type: "user.updated" }>
//   ) {
//     const { id, email_addresses, first_name, last_name, image_url } =
//       event.data;

//     const primaryEmail = email_addresses.find(
//       (e) => e.id === email_addresses[0].id
//     )?.email_address;

//     try {
//       await prisma.user.updateMany({
//         where: { clerkId: id },
//         data: {
//           email: primaryEmail,
//           firstName: first_name,
//           lastName: last_name,
//           imageUrl: image_url,
//         },
//       });
//       console.log(`User updated: ${id}`);
//     } catch (error) {
//       console.error("Error handling user.updated:", error);
//       throw error;
//     }
//   }

//   private async handleUserDeleted(
//     event: Extract<ClerkWebhookEvent, { type: "user.deleted" }>
//   ) {
//     const { id } = event.data;

//     try {
//       await prisma.user.deleteMany({
//         where: { clerkId: id },
//       });
//       console.log(`User deleted: ${id}`);
//     } catch (error) {
//       console.error("Error handling user.deleted:", error);
//       throw error;
//     }
//   }
//   private async handleOrganizationCreated(
//     event: Extract<ClerkWebhookEvent, { type: "organization.created" }>
//   ) {
//     const { id, name, slug } = event.data;

//     try {
//       await prisma.organization.create({
//         data: {
//           clerkOrgId: id,
//           name,
//           slug,
//         },
//       });
//       console.log(`Organization created: ${id} (${name})`);
//     } catch (error) {
//       console.error("Error handling organization.created:", error);
//       throw error;
//     }
//   }
//   private async handleOrganizationUpdated(
//     event: Extract<ClerkWebhookEvent, { type: "organization.updated" }>
//   ) {
//     const { id, name, slug } = event.data;

//     try {
//       await prisma.organization.updateMany({
//         where: { clerkOrgId: id },
//         data: {
//           clerkOrgId: id,
//           name,
//           slug,
//         },
//       });
//       console.log(`Organization updated: ${id} (${name})`);
//     } catch (error) {
//       console.error("Error handling organization.updated:", error);
//       throw error;
//     }
//   }
//   private async handleOrganizationDeleted(
//     event: Extract<ClerkWebhookEvent, { type: "organization.deleted" }>
//   ) {
//     const { id } = event.data;

//     try {
//       await prisma.organization.delete({
//         where: { clerkOrgId: id },
//       });
//       console.log(`Organization deleted: ${id}`);
//     } catch (error) {
//       console.error(`Error handling organzation.delete`, error);
//       throw error;
//     }
//   }
//   private async handleMembershipCreated(
//     event: Extract<
//       ClerkWebhookEvent,
//       { type: "organizationMembership.created" }
//     >
//   ) {
//     const { organization, public_user_data, role } = event.data;
//     try {
//       const org = await prisma.organization.findUnique({
//         where: { clerkOrgId: organization.id },
//       });

//       if (!org) {
//         throw new Error(`Organization not found: ${organization.id}`);
//       }

//       await prisma.user.upsert({
//         where: { clerkId: public_user_data.user_id },
//         create: {
//           clerkId: public_user_data.user_id,
//           email: `${public_user_data.user_id}@temp.clerk`,
//           firstName: public_user_data.first_name,
//           lastName: public_user_data.last_name,
//           orgId: org.id,
//           role: this.mapClerkRoleToAppRole(role),
//         },
//         update: {
//           orgId: org.id,
//           role: this.mapClerkRoleToAppRole(role),
//         },
//       });

//       console.log(
//         `User ${public_user_data.user_id} added to org ${organization.id}`
//       );
//     } catch (error) {
//       console.error("Error handling organizationMembership.created:", error);
//       throw error;
//     }
//   }
//   private async handleMembershipDeleted(
//     event: Extract<
//       ClerkWebhookEvent,
//       { type: "organizationMembership.deleted" }
//     >
//   ) {
//     const { organization, public_user_data } = event.data;

//     try {
//       await prisma.user.deleteMany({
//         where: {
//           clerkId: public_user_data.user_id,
//           orgId: organization.id,
//         },
//       }),
//         console.log(
//           `User ${public_user_data.user_id} removed from org ${organization.id}`
//         );
//     } catch (error) {
//       console.error("Error handling organizationMembership.deleted:", error);
//       throw error;
//     }
//   }

//   private mapClerkRoleToAppRole(clerkRole: string) {
//     switch (clerkRole) {
//       case "admin":
//         return "ADMIN";
//       case "basic_member":
//         return "MEMBER";
//       default:
//         return "MEMBER";
//     }
//   }
// }

// ----------------------------------------------------------------------------------
// apps/api/src/services/clerk-webhook.service.ts
// ----------------------------------------------------------------------------------
// import { prisma, Role } from "../../../../packages/db/src/generated/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { prisma } from "@postpulse/db";
import { Role } from "../../../../packages/db/src/generated/client"; // ----------------------------------------------------------------------------------
// 1. Clerk Webhook Type Definitions
// ----------------------------------------------------------------------------------

export interface ClerkUserPayload {
  id: string;
  email_addresses: { email_address: string; id: string }[];
  first_name: string | null;
  last_name: string | null;
  image_url: string;
  created_at: number;

  primary_email_address_id: string | null;
  primary_phone_number_id: string | null;
}

export interface ClerkOrganizationPayload {
  id: string;
  name: string;
  slug: string;
}

export type ClerkWebhookEvent =
  | { type: "user.created"; data: ClerkUserPayload }
  | { type: "user.updated"; data: ClerkUserPayload }
  | { type: "user.deleted"; data: { id: string } }
  | { type: "organization.created"; data: ClerkOrganizationPayload }
  | { type: "organization.updated"; data: ClerkOrganizationPayload }
  | { type: "organization.deleted"; data: { id: string } }
  | {
      type: "organizationMembership.created";
      data: {
        organization: { id: string };
        public_user_data: {
          user_id: string;
          first_name: string | null;
          last_name: string | null;
        };
        role: string;
      };
    }
  | {
      type: "organizationMembership.deleted";
      data: {
        organization: { id: string };
        public_user_data: { user_id: string };
      };
    };

// ----------------------------------------------------------------------------------
// 2. Clerk Webhook Service Implementation
// ----------------------------------------------------------------------------------

export class ClerkWebhookService {
  // Main handler
  async handleEvent(event: ClerkWebhookEvent) {
    try {
      switch (event.type) {
        case "user.created":
          return await this.handleUserCreated(event);
        case "user.updated":
          return await this.handleUserUpdated(event);
        case "user.deleted":
          return await this.handleUserDeleted(event);
        case "organization.created":
          return await this.handleOrganizationCreated(event);
        case "organization.updated":
          return await this.handleOrganizationUpdated(event);
        case "organization.deleted":
          return await this.handleOrganizationDeleted(event);
        case "organizationMembership.created":
          return await this.handleMembershipCreated(event);
        case "organizationMembership.deleted":
          return await this.handleMembershipDeleted(event);
        default:
          console.log("Unhandled event:", (event as any).type);
          return;
      }
    } catch (err) {
      console.error(`Error processing ${event.type}`, err);
      throw err;
    }
  }

  // Helper: get primary email
  private getPrimaryEmail(data: ClerkUserPayload): string | undefined {
    if (!data.primary_email_address_id) return undefined;

    const emailObj = data.email_addresses.find(
      (e) => e.id === data.primary_email_address_id
    );

    return emailObj?.email_address;
  }

  private async handleUserCreated(
    event: Extract<ClerkWebhookEvent, { type: "user.created" }>
  ) {
    const data = event.data;
    const primaryEmail = this.getPrimaryEmail(data);

    if (!primaryEmail) {
      console.warn(`No primary email for user ${data.id}; skipping.`);
      return;
    }

    try {
      await prisma.user.upsert({
        where: { clerkId: data.id },
        update: {
          email: primaryEmail,
          firstName: data.first_name,
          lastName: data.last_name,
          imageUrl: data.image_url,
        },
        create: {
          clerkId: data.id,
          email: primaryEmail,
          firstName: data.first_name,
          lastName: data.last_name,
          imageUrl: data.image_url,
        },
      });

      console.log(`User upserted: ${data.id}`);
    } catch (err) {
      if (
        err instanceof PrismaClientKnownRequestError &&
        err.code === "P2002"
      ) {
        console.warn(
          `Duplicate user (P2002) for ${data.id} ignored due to upsert.`
        );
        return;
      }
      throw err;
    }
  }

  private async handleUserUpdated(
    event: Extract<ClerkWebhookEvent, { type: "user.updated" }>
  ) {
    const data = event.data;
    const primaryEmail = this.getPrimaryEmail(data);

    const result = await prisma.user.updateMany({
      where: { clerkId: data.id },
      data: {
        ...(primaryEmail && { email: primaryEmail }),
        firstName: data.first_name,
        lastName: data.last_name,
        imageUrl: data.image_url,
      },
    });

    if (result.count === 0) {
      console.warn(`User update failed; no user with clerkId=${data.id}`);
    } else {
      console.log(`User updated: ${data.id}`);
    }
  }

  private async handleUserDeleted(
    event: Extract<ClerkWebhookEvent, { type: "user.deleted" }>
  ) {
    const { id } = event.data;

    await prisma.user.deleteMany({
      where: { clerkId: id },
    });

    console.log(`User deleted: ${id}`);
  }

  private async handleOrganizationCreated(
    event: Extract<ClerkWebhookEvent, { type: "organization.created" }>
  ) {
    const { id, name, slug } = event.data;

    await prisma.organization.create({
      data: {
        clerkOrgId: id,
        name,
        slug,
      },
    });

    console.log(`Org created: ${id}`);
  }

  private async handleOrganizationUpdated(
    event: Extract<ClerkWebhookEvent, { type: "organization.updated" }>
  ) {
    const { id, name, slug } = event.data;

    await prisma.organization.updateMany({
      where: { clerkOrgId: id },
      data: { name, slug },
    });

    console.log(`Org updated: ${id}`);
  }

  private async handleOrganizationDeleted(
    event: Extract<ClerkWebhookEvent, { type: "organization.deleted" }>
  ) {
    const { id } = event.data;

    await prisma.organization.deleteMany({
      where: { clerkOrgId: id },
    });

    console.log(`Org deleted: ${id}`);
  }

  private async handleMembershipCreated(
    event: Extract<
      ClerkWebhookEvent,
      { type: "organizationMembership.created" }
    >
  ) {
    const { organization, public_user_data, role } = event.data;

    const org = await prisma.organization.findUnique({
      where: { clerkOrgId: organization.id },
    });

    if (!org) {
      console.warn(`Org ${organization.id} not found yet; retry later`);
      return;
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: public_user_data.user_id },
    });

    if (!user) {
      console.warn(
        `User ${public_user_data.user_id} not found yet; retry later`
      );
      return;
    }

    await prisma.user.update({
      where: { clerkId: public_user_data.user_id },
      data: {
        orgId: org.id,
        role: this.mapClerkRoleToAppRole(role),
      },
    });

    console.log(
      `Membership created: user ${public_user_data.user_id} → org ${organization.id}`
    );
  }

  private async handleMembershipDeleted(
    event: Extract<
      ClerkWebhookEvent,
      { type: "organizationMembership.deleted" }
    >
  ) {
    const { organization, public_user_data } = event.data;

    await prisma.user.updateMany({
      where: {
        clerkId: public_user_data.user_id,
        orgId: organization.id,
      },
      data: {
        orgId: null,
        role: Role.MEMBER,
      },
    });

    console.log(
      `Membership removed: user ${public_user_data.user_id} from org ${organization.id}`
    );
  }

  private mapClerkRoleToAppRole(clerkRole: string): Role {
    switch (clerkRole) {
      case "org:admin":
      case "admin":
        return Role.ADMIN;

      case "org:member":
      case "basic_member":
      default:
        return Role.MEMBER;
    }
  }
}
