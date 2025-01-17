const authHook = async (request, reply) => {
  try {
    const publicRoutes = ['/login'];

    if (publicRoutes.includes(request.url)) {
      return;
    }

    if (request.headers.authorization) {
      const token = request.headers.authorization.split(' ')[1];
      request.user = await request.server.jwt.verify(token);
    } else {
      return reply.status(401).send({ error: 'Access denied. Authentication is required to access this resource.' });
    }
  } catch (error) {
    return reply.status(401).send({ error: 'Invalid or expired token' });
  }
};

export default authHook;