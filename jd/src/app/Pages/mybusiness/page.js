import React from "react";
import LoginForCheckBusiness from "../../Components/MyBusiness/LoginForCheckBusiness";
import NoBusinessFound from "../../Components/MyBusiness/NoBusinessFound";
import BusinessList from "../../Components/MyBusiness/BusinessList";
const page = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          {/* ========0 If User Not Login ========= */}
          {/* Load This components */}
          <LoginForCheckBusiness />

          {/* ----------------------- */}

          {/* ====== If User Business Not found ========= */}
          {/* Load This components */}

          <NoBusinessFound />

          {/* =========================== */}

          {/* ======== If User List his Business ========= */}
          {/* Load This components */}

          <BusinessList />    

          {/* ========================= */}
        </div>
      </div>
    </>
  );
};

export default page;
