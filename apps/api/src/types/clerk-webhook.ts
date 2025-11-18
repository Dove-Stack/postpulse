export type ClerkWebhookEvent =
  | UserCreatedEvent
  | UserUpdatedEvent
  | UserDeletedEvent
  | OrganizationCreatedEvent
  | OrganizationUpdatedEvent
  | OrganizationDeletedEvent
  | OrganizationMembershipCreatedEvent
  | OrganizationMembershipDeletedEvent;

interface UserCreatedEvent {
  type: "user.created";
  data: {
    id: string;
    email_addresses: Array<{
      email_address: string;
      id: string;
    }>;
    first_name: string | null;
    last_name: string | null;
    image_url: string;
    created_at: number;
  };
}

interface UserUpdatedEvent {
  type: "user.updated";
  data: {
    id: string;
    email_addresses: Array<{
      email_address: string;
      id: string;
    }>;
    first_name: string | null;
    last_name: string | null;
    image_url: string;
  };
}

interface UserDeletedEvent {
  type: "user.deleted";
  data: {
    id: string;
    deleted: boolean;
  };
}

interface OrganizationCreatedEvent {
  type: "organization.created";
  data: {
    id: string;
    name: string;
    slug: string;
    created_at: number;
  };
}

interface OrganizationUpdatedEvent {
  type: "organization.updated";
  data: {
    id: string;
    name: string;
    slug: string;
  };
}

interface OrganizationDeletedEvent {
  type: "organization.deleted";
  data: {
    id: string;
    deleted: boolean;
  };
}

interface OrganizationMembershipCreatedEvent {
  type: "organizationMembership.created";
  data: {
    id: string;
    organization: {
      id: string;
      name: string;
      slug: string;
    };
    public_user_data: {
      user_id: string;
      first_name: string | null;
      last_name: string | null;
    };
    role: string;
  };
}

interface OrganizationMembershipDeletedEvent {
  type: "organizationMembership.deleted"
  data: {
    id: string
    organization: {
        id: string
    }
    public_user_data: {
        user_id: string
    }
  }
}
