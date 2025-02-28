const ProfilePage = ({ params }: any) => {
  return (
    <div>
      <h1>Profile Page</h1>
      <p>
        These are the params<span className="px-2">{params.id}</span>
      </p>
    </div>
  );
};
export default ProfilePage;
