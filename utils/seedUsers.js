import User from '../models/User.js';

const upsertUser = async ({ name, email, password, role }) => {
  const existing = await User.findOne({ email });
  if (!existing) {
    await User.create({ name, email, password, role });
    console.log(`Seed user created: ${email} (${role})`);
    return;
  }

  let changed = false;
  if (existing.name !== name) {
    existing.name = name;
    changed = true;
  }
  if (existing.role !== role) {
    existing.role = role;
    changed = true;
  }
  if (password) {
    existing.password = password; // will re-hash via pre-save hook
    changed = true;
  }

  if (changed) {
    await existing.save();
    console.log(`Seed user updated: ${email} (${role})`);
  }
};

export const ensureSeedUsers = async () => {
  await upsertUser({
    name: 'Admin',
    email: 'admin@gmail.com',
    password: '888888',
    role: 'admin'
  });

  await upsertUser({
    name: 'Ayesha',
    email: 'ayesha@gmail.com',
    password: 'myGoodness',
    role: 'admin'
  });
};

