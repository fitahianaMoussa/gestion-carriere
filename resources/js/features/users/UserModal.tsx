import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';

interface UserData {
    name: string;
    email: string;
    matricule: string;
    telephone: string;
    date_embauche: string;
    adresse: string;
    genre: string;
}

interface UserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void; // Updated to handle no arguments
    user?: UserData | null;
    setData: (field: keyof UserData, value: string) => void;
    data: Partial<UserData>;
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, onSubmit, user, setData, data }) => {
    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <div className="fixed inset-0 z-10 flex items-center justify-center p-4 overflow-y-auto bg-black bg-opacity-50">
            <div className="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
                <h2 className="mb-4 text-xl font-bold">
                    {user ? 'Modifier l\'utilisateur' : 'Ajouter un utilisateur'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Input
                            type="text"
                            placeholder="Nom"
                            value={data.name || ''}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            type="email"
                            placeholder="Email"
                            value={data.email || ''}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            type="text"
                            placeholder="Matricule"
                            value={data.matricule || ''}
                            onChange={(e) => setData('matricule', e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            type="text"
                            placeholder="Téléphone"
                            value={data.telephone || ''}
                            onChange={(e) => setData('telephone', e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            type="date"
                            placeholder="Date d'embauche"
                            value={data.date_embauche || ''}
                            onChange={(e) => setData('date_embauche', e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            type="text"
                            placeholder="Adresse"
                            value={data.adresse || ''}
                            onChange={(e) => setData('adresse', e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <select
                            value={data.genre || ''}
                            onChange={(e) => setData('genre', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="">Sélectionnez le genre</option>
                            <option value="Homme">Homme</option>
                            <option value="Femme">Femme</option>
                        </select>
                    </div>
                    
                    <div className="flex justify-end mt-4 space-x-4">
                        <Button type="button" variant="outline" onClick={onClose}>Annuler</Button>
                        <Button type="submit" variant="primary">
                            {user ? 'Modifier' : 'Ajouter'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserModal;
