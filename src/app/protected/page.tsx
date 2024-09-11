// pages/protected.tsx
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';

const ProtectedPage = ({ session }: any) => {
    console.log(session)
  if (!session) {
    return <div>Access Denied</div>;
  }

  return <div>Welcome, {session.user?.name}</div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // context เป็นพารามิเตอร์ที่ถูกส่งเข้า getServerSideProps
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default ProtectedPage;
