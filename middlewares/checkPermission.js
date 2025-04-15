const jwt = require('jsonwebtoken');
const supabase = require('../supabaseClient');

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET n'est pas défini dans .env.local");
}

const checkPermission = (permissionKey) => {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token manquant ou mal formé' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, JWT_SECRET);

      const { data: user, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', decoded.id)
        .single();

      if (userError || !user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé' });
      }

      const { data: roleData, error: roleError } = await supabase
        .from('roles')
        .select('*')
        .eq('id', user.role)
        .single();

      if (roleError || !roleData) {
        return res.status(403).json({ error: 'Rôle introuvable ou inaccessible' });
      }

      if (!roleData[permissionKey]) {
        return res.status(403).json({
          error: `Permission refusée : ${permissionKey}`,
          role: roleData.name
        });
      }

      req.user = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: roleData.name,
      };

      next();
    } catch (err) {
      console.error('Erreur checkPermission:', err);
      return res.status(401).json({ error: 'Token invalide ou expiré' });
    }
  };
};

module.exports = checkPermission;
