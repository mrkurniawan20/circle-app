const socials = ['github.png', 'linkedin.png', 'twitter.png', 'facebook.png'];

function ContainerCredentials() {
  return (
    <div className="bg-gray-800 rounded-xl w-full max-w-[430px] px-2 py-4">
      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-200 font-medium">
        <span>Developed by Rafli Kurniawan</span>
        <span className="text-xs text-gray-400">•</span>
        <div className="flex gap-1 items-center">
          {socials.map((icon, index) => (
            <a key={index} href="#" className="size-5">
              <img src={`/src/assets/img/${icon}`} alt="" className="w-full grayscale hover:grayscale-0 transition duration-100" />
            </a>
          ))}
        </div>
      </div>
      <p className="mt-3 text-xs text-slate-400 flex items-center">
        Powered by
        <img src="/src/assets/img/dw.png" alt="" className="w-5 mx-2" />
        DumbWays Indonesia • #1 Coding Bootcamp
      </p>
    </div>
  );
}

export default ContainerCredentials;
