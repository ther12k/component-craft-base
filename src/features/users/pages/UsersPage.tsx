
import { useState } from 'react';
import UsersTable from '@/features/users/components/UsersTable';
import UserModal from '@/features/users/components/UserModal';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useUsersData } from '@/features/users/hooks/useUsersData';

const UsersPage = () => {
  const { users, loading, addUser, updateUser, deleteUser } = useUsersData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const handleOpenModal = (user: any = null) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
  };

  const handleSaveUser = (userData: any) => {
    if (currentUser) {
      updateUser(currentUser.id, userData);
    } else {
      addUser(userData);
    }
    handleCloseModal();
  };

  const handleDeleteUser = (userId: string) => {
    deleteUser(userId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Users</h2>
          <p className="text-muted-foreground mt-2">
            Manage user accounts and permissions
          </p>
        </div>
        <Button onClick={() => handleOpenModal()} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      <UsersTable 
        users={users}
        loading={loading}
        onEdit={handleOpenModal}
        onDelete={handleDeleteUser}
      />
      
      <UserModal
        open={isModalOpen}
        user={currentUser}
        onClose={handleCloseModal}
        onSave={handleSaveUser}
      />
    </div>
  );
};

export default UsersPage;
