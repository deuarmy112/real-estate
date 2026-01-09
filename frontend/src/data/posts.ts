const posts = Array.from({ length: 30 }).map((_, i) => {
  const id = `post-${i + 1}`;
  const isVideo = i % 7 === 0;
  return {
    id,
    title: `Hot Sale ${i + 1}`,
    excerpt: `This is a short description for Hot Sale ${i + 1}. Great opportunity!`,
    likes: Math.floor(Math.random() * 200),
    views: Math.floor(Math.random() * 5000),
    media: isVideo
      ? { type: 'video', src: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4' }
      : { type: 'image', src: `https://picsum.photos/seed/${i + 1}/800/800` },
  };
});

export default posts;
