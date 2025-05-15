
import { useState, useEffect } from 'react';

// Define user type
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
  createdAt: string;
}

// Mock users data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    status: 'active',
    createdAt: '2023-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Regular User',
    email: 'user@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2023-02-15T00:00:00Z',
  },
  {
    id: '3',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    status: 'inactive',
    createdAt: '2023-03-20T00:00:00Z',
  },
  {
    id: '4',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2023-04-10T00:00:00Z',
  },
];

// Mock API functions (replace with actual API calls or Firebase)
const fetchUsers = () => {
  return Promise.resolve(mockUsers);
};

export const useUsersData = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  // Add a user
  const addUser = (userData: Omit<User, 'id' | 'createdAt'>) => {
    const newUser: User = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString(),
    };
    
    setUsers(prevUsers => [...prevUsers, newUser]);
    return newUser;
  };

  // Update a user
  const updateUser = (id: string, userData: Partial<Omit<User, 'id' | 'createdAt'>>) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === id ? { ...user, ...userData } : user
      )
    );
  };

  // Delete a user
  const deleteUser = (id: string) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
  };

  return {
    users,
    loading,
    addUser,
    updateUser,
    deleteUser,
  };
};
