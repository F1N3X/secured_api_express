const supabase = require('../supabaseClient');

exports.getAllUsers = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, name, email');

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ users: data });
  } catch (err) {
    console.error('Erreur lors de la récupération des utilisateurs :', err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
};

exports.getMyUser = async (req, res) => {
  const userId = req.user.id;

  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, name, email')
      .eq('id', userId)
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ user: data });
  } catch (err) {
    console.error('Erreur lors de la récupération du profil utilisateur :', err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
};
