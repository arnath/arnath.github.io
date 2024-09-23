export type Post = {
  title: string;
  slug: string;
  description: string;
  date: string;
  published: boolean;
};

export type Job = {
  id: string;
  link: URL | undefined;
  postDate: Date;
  title: string;
  description: string;
  teamName: string | undefined;
  locations: string[];
  isRemote: boolean;
}
