import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const DEFAULT_ROLES = [
  {
    id: 'admin',
    name: 'Administrador',
    description: 'Acceso completo al sistema',
    color: '#8B5CF6',
    permissions: [
      'Dashboard',
      'Citas',
      'Vehículos',
      'Servicios',
      'Productos',
      'Ventas',
      'Compras',
      'Cotizaciones',
      'Reportes',
      'Usuarios',
      'Roles',
    ],
  },
  {
    id: 'tecnico',
    name: 'Técnico',
    description: 'Acceso a servicios y mantenimiento',
    color: '#60A5FA',
    permissions: ['Citas', 'Vehículos', 'Servicios'],
  },
  {
    id: 'cliente',
    name: 'Cliente',
    description: 'Acceso al portal de clientes',
    color: '#34D399',
    permissions: ['Cotizaciones', 'Reportes'],
  },
];

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [roles, setRoles] = useState(DEFAULT_ROLES);

  useEffect(() => {
    // Force login by starting unauthenticated, even if there is a currentUser in localStorage
    localStorage.removeItem('currentUser');

    const savedRoles = JSON.parse(localStorage.getItem('roles')) || DEFAULT_ROLES;
    setRoles(savedRoles);

    if (!localStorage.getItem('roles')) {
      localStorage.setItem('roles', JSON.stringify(DEFAULT_ROLES));
    }

    const currentUsers = JSON.parse(localStorage.getItem('users')) || [];
    if (!currentUsers.some(u => u.role === 'Administrador')) {
      const adminSeed = {
        id: crypto.randomUUID(),
        name: 'Administrador',
        email: 'admin@admin.com',
        password: 'admin123',
        role: 'Administrador',
        phone: '',
      };
      currentUsers.push(adminSeed);
      localStorage.setItem('users', JSON.stringify(currentUsers));
    }

    setLoading(false);
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      setIsAuthenticated(true);
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return { success: true, user };
    }
    return { success: false };
  };

  const register = ({ name, email, password, role }) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.some(u => u.email === email)) {
      return { success: false, error: 'El correo ya está registrado' };
    }

    const newUser = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
      role,
      phone: '',
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    return { success: true };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const saveRole = (role) => {
    const existingRoles = JSON.parse(localStorage.getItem('roles')) || [];
    const exists = existingRoles.some((r) => r.id === role.id);
    const updated = exists ? existingRoles.map(r => (r.id === role.id ? role : r)) : [...existingRoles, role];
    localStorage.setItem('roles', JSON.stringify(updated));
    setRoles(updated);
    return { success: true };
  };

  const deleteRole = (roleId) => {
    const existingRoles = JSON.parse(localStorage.getItem('roles')) || [];
    const updated = existingRoles.filter((r) => r.id !== roleId);
    localStorage.setItem('roles', JSON.stringify(updated));
    setRoles(updated);
    return { success: true };
  };

  const saveUser = (user) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const exists = users.some((u) => u.id === user.id);

    if (exists) {
      const updatedUsers = users.map((u) => (u.id === user.id ? user : u));
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      return { success: true };
    }

    user.id = crypto.randomUUID();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    return { success: true };
  };

  const deleteUser = (userId) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updated = users.filter((u) => u.id !== userId);
    localStorage.setItem('users', JSON.stringify(updated));
    return { success: true };
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        currentUser,
        login,
        register,
        logout,
        roles,
        saveRole,
        deleteRole,
        saveUser,
        deleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
