---
title: TIL you can host a single page app using S3 + a CDN
date: 2023-09-01
published: false
---

I've known for a while that you can host a [static site][static] using S3. This
is actually pretty simple to do. S3 even provides a static website hosting
option where it will handle HTTP redirects and point traffic to the same route
within the bucket.

However, I found out today that you can also host a [single page app][spa] using
S3! The secret sauce here is that you need a CDN sitting in front of your
bucket. You can use CloudFront or Fastly or whatever you like for this. If you
use CloudFront, things are kind of handled for you. If you use something else,
there's one tweak you have to make.

When S3 receives a request for a path that doesn't exist in the bucket, it
returns a 403. Your SPA will sometimes make requests to other URLs that don't
represent physical assets in the bucket. The routing for these requests is
handled by your `index.html` file. Therefore, you need to configure your CDN to
redirect 403s from the backend to `index.html`.

With that minor tweak, you should be good to go! I thought this was cool when I
found out about it. Having S3 as a hosting option definitely simplifies
deploying single-page apps. A couple other caveats you should be aware of:

- Your S3 bucket must NOT block public access. This doesn't mean that you need
  to put in an ACL that allows anyone to read from the bucket. You just can't
  enable the new [Block Public Access][bpa] feature.
- It's up to you whether you enable static website hosting on the bucket or not.
  If you don't, you'll have to set something up to redirect requests for `/` to
  `/index.html`. If you do, the website endpoints don't support SSL so the
  traffic between your CDN and S3 will not be encrypted.

[static]: https://en.wikipedia.org/wiki/Static_web_page
[spa]: https://en.wikipedia.org/wiki/Single-page_application
[bpa]:
  https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-block-public-access.html
