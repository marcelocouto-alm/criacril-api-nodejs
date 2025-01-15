const authHook = async (request, reply) => {
  try {
    if (request.headers.authorization) {
      const token = request.headers.authorization.split(' ')[1];
      request.user = await request.server.jwt.verify(token); // Verifica e decodifica
    } else {
      return reply.status(401).send({ error: 'Token is required' });
    }
  } catch (error) {
    return reply.status(401).send({ error: 'Invalid or expired token' });
  }
};

export default authHook;