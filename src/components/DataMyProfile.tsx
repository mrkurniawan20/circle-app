import React from 'react';

function DataMyProfile() {
  return (
    <div>
      <h2 className="text-gray-50 pb-1 text-2xl font-semibold">Dio Brando👊🏼</h2>
      <p className="text-slate-400 text-sm pb-1">@konodioda</p>
      <p className="text-gray-100 pb-1">IT IS ME! DIO! </p>
      <div className="flex gap-5 pb-5">
        <div className="flex gap-2">
          <span className="text-gray-100">1</span>
          <p className="text-slate-400">Following</p>
        </div>
        <div className="flex gap-2">
          <span className="text-gray-100">30M</span>
          <p className="text-slate-400">Followers</p>
        </div>
      </div>
    </div>
  );
}

export default DataMyProfile;
