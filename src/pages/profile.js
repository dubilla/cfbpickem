import { verifyToken } from '../utils/auth';

export async function getServerSideProps(context) {
  const token = context.req.headers.cookie?.split('=')[1];

  if (token) {
    try {
      verifyToken(token);
      return { props: {} };
    } catch (error) {
      return { redirect: { destination: '/login', permanent: false } };
    }
  } else {
    return { redirect: { destination: '/login', permanent: false } };
  }
}
