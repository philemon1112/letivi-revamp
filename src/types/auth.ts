export type LoginData = {
  email?: string;
  signin_mode: string;
  meta: {
    password?: string;
    token?: string;
  };
};

export type UserData = {
  first_name: string;
  last_name: string;
  gender: string;
  date_of_birth: string;
  privacy: boolean;
  profession: string;
  country: string;
  industry_id: string | null;
  other_industry: string;
  email: string;
  signup_mode: string;
  meta: {
    password: string;
    confirm_password: string;
  };
};

export type UpdatePasswordPayload = {
  current_password: string;
  new_password: string;
  confirm_password: string;
};
