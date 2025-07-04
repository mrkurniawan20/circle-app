const LoadingPage = () => {
  return (
    <div className="bg-[#213547] flex flex-col items-center justify-center min-h-screen space-y-4">
      <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />

      <p className="text-white text-lg font-semibold">Loading...</p>

      <div className="w-48 h-2 bg-green-500 rounded-full animate-pulse" />
    </div>
  );
};

export default LoadingPage;
