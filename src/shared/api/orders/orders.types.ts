export type Order = {
  address: string;
  c_date: string;
  c_date_pay: string;
  change_status: string;
  change_sum: string;
  client: string;
  closed: string;
  closed_date: number;
  date: string;
  date_pay: string;
  date_receiving: number;
  disbursement_date: number;
  discount: string;
  email_payer: string;
  fi_child: string;
  fio_payer: string;
  full_id: string;
  id: string;
  in_work: string;
  in_work_date: string;
  low_fi_child: string;
  low_fio_payer: string;
  manager_notice: number;
  phone: string;
  photo_size: string;
  ps_status: string;
  ps_type: string;
  psid: string;
  receiving: string;
  receiving_email: string;
  s_group: string;
  status: string;
  sum: string;
  type: string;
  type_data: string;
  type_pay: string;
  uid: string;
  unload: string;
  unload_date: string;
  value: string;
};

export type OrdersResponse = {
  response: {
    data: {
      is_s_k_alb: string;
      message: string;
      orders: Order[];
    };
    status: number;
  };
};
