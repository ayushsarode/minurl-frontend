import Nav from "../../components/Dashboard/Nav";
import ProfileComponent from "../../components/UploadProfile";

const Setting = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <div className="max-w-7xl px-4 py-8 ml-110">
        <h2 className="text-3xl font-medium text-gray-900 mb-6">
          Account Settings
        </h2>
        <div className=" mt-10 rounded-lg p-6 ">
          <ProfileComponent />
        </div>
      </div>
    </div>
  );
};

export default Setting;
