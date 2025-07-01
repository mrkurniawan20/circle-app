const socials = [
  'https://res.cloudinary.com/dkadm58qz/image/upload/v1751363381/github_rb7zvo.png',
  'https://res.cloudinary.com/dkadm58qz/image/upload/v1751363381/linkedin_kxe2yf.png',
  'https://res.cloudinary.com/dkadm58qz/image/upload/v1751363381/twitter_hd8eqx.png',
  'https://res.cloudinary.com/dkadm58qz/image/upload/v1751363381/facebook_f3fwnc.png',
];

function ContainerCredentials() {
  return (
    <div className="bg-gray-800 rounded-xl w-full max-w-[430px] px-2 py-4">
      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-200 font-medium">
        <span>Developed by Rafli Kurniawan</span>
        <span className="text-xs text-gray-400">•</span>
        <div className="flex gap-1 items-center">
          {socials.map((icon, index) => (
            <a key={index} href="#" className="size-5">
              <img src={`${icon}`} alt="" className="w-full grayscale hover:grayscale-0 transition duration-100" />
            </a>
          ))}
        </div>
      </div>
      <p className="mt-3 text-xs text-slate-400 flex items-center">
        Powered by
        <img src="https://res.cloudinary.com/dkadm58qz/image/upload/v1751363380/dw_ugi9bn.png" alt="" className="w-5 mx-2" />
        DumbWays Indonesia • #1 Coding Bootcamp
      </p>
    </div>
  );
}

export default ContainerCredentials;
