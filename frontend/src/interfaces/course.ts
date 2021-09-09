export interface ICourse {
  _id: string;
  tags: string[];
  level: string;
  certificate: string;
  description: string;
  title: string;
  image: {
    public_id: string;
    photo_url: string;
  };
  lessons: any[];
  owner: {
    _id: string;
    firstName: string;
    lastName: string;
  };
}
