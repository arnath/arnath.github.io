export type Post = {
  title: string;
  slug: string;
  description: string;
  date: string;
  published: boolean;
};

export type Job = {
  id: string;
  link: URL;
  postDate: Date;
  title: string;
  summary: string;
  teamName: string | undefined;
  locations: string;
  isRemote: boolean;
}
