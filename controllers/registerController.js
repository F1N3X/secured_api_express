const supabase = require('../supabaseClient');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Tous les champs sont requis' });
  }

  try {
    const { data, error } = await supabase
      .from('users')
      .insert([{ name, email, password }]);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(201).json({ message: 'Utilisateur créé avec succès', user: data[0] });

  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
