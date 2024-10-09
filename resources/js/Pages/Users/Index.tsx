import React, { useState, useEffect } from "react";
import { Inertia } from '@inertiajs/inertia';
import { useForm } from '@inertiajs/react';
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from '@tanstack/react-table';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Button } from '@/components/ui/button';
import { Pagination } from '@/Components/ui/pagination';
import { Input } from '@/components/ui/input';
import UserModal from "@/features/users/UserModal";

interface User {
    id: number;
    name: string;
    email: string;
    matricule?: string;
    telephone?: string;
    date_embauche?: string;
    adresse?: string;
    genre?: string;
}

interface IndexProps {
    users: User[];
}

// Skeleton Loader Component
const SkeletonLoader = ({ width, height }: { width: string, height: string }) => {
    return (
        <div
            className="bg-gray-300 rounded animate-pulse"
            style={{ width, height }}
        ></div>
    );
};

// Function to generate initials for avatar
const generateAvatar = (name: string) => {
    const initials = name
        .split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase();
    return `https://avatars.dicebear.com/api/initials/${initials}.svg`; // Generate avatar via a service
};

const Index: React.FC<IndexProps> = ({ users }) => {
    const [search, setSearch] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const { data, setData, post, put, reset } = useForm<User | Partial<User>>({
        name: '',
        email: '',
        matricule: '',
        telephone: '',
        date_embauche: '',
        adresse: '',
        genre: '',
    });
    const [tableData, setTableData] = useState<User[]>(users);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (Array.isArray(users)) {
            setTableData(users);
            setIsLoading(false);
        } else {
            console.error("Invalid users data:", users);
            setError("Unable to load user data");
            setIsLoading(false);
        }
    }, [users]);

    const handleSearch = () => {
        setCurrentPage(1);
        Inertia.get(route('users.index'), { search }, { preserveState: true });
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        Inertia.get(route('users.index'), { page, search }, { preserveState: true });
    };

    const onSubmit = () => {
        if (editingUser) {
            put(route('users.update', editingUser.id), data);
        } else {
            post(route('users.store'), data);
        }
        reset();
        setModalOpen(false);
        setEditingUser(null);
    };

    const handleEdit = (user: User) => {
        setEditingUser(user);
        setData(user); // Set the data for editing
        setModalOpen(true);
    };

    // Update columns to include additional info and avatar
    const columns = [
        {
            accessorKey: 'avatar',
            header: 'Avatar',
            cell: ({ row }: any) => (
                <img
                    src={generateAvatar(row.original.name)}
                    alt={`Avatar of ${row.original.name}`} // Fixed alt attribute
                    className="w-10 h-10 rounded-full"
                />
            ),
        },
        {
            accessorKey: 'name',
            header: 'Nom',
        },
        {
            accessorKey: 'email',
            header: 'Email',
        },
        {
            accessorKey: 'matricule',
            header: 'Matricule',
        },
        {
            accessorKey: 'telephone',
            header: 'Téléphone',
        },
        {
            accessorKey: 'date_embauche',
            header: 'Date d\'embauche',
        },
        {
            accessorKey: 'adresse',
            header: 'Adresse',
        },
        {
            accessorKey: 'genre',
            header: 'Genre',
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }: any) => (
                <Button variant="outline" onClick={() => handleEdit(row.original)}>Modifier</Button>
            ),
        },
    ];

    const table = useReactTable({
        data: tableData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <Authenticated>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex justify-between mb-4">
                                {isLoading ? (
                                    <>
                                        <SkeletonLoader width="100%" height="40px" />
                                        <SkeletonLoader width="120px" height="40px" />
                                    </>
                                ) : (
                                    <>
                                        <Input
                                            type="text"
                                            placeholder="Rechercher des utilisateurs..."
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                            className="flex-grow mr-2"
                                        />
                                        <Button onClick={() => { setEditingUser(null); setModalOpen(true); }}>Ajouter un utilisateur</Button>
                                    </>
                                )}
                            </div>

                            {isLoading ? (
                                <div className="space-y-4">
                                    <SkeletonLoader width="100%" height="40px" />
                                    <SkeletonLoader width="100%" height="40px" />
                                    <SkeletonLoader width="100%" height="40px" />
                                    <SkeletonLoader width="100%" height="40px" />
                                </div>
                            ) : error ? (
                                <div>Error: {error}</div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            {table.getHeaderGroups().map(headerGroup => (
                                                <tr key={headerGroup.id}>
                                                    {headerGroup.headers.map(header => (
                                                        <th
                                                            key={header.id}
                                                            scope="col"
                                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                                        >
                                                            {flexRender(
                                                                header.column.columnDef.header,
                                                                header.getContext()
                                                            )}
                                                        </th>
                                                    ))}
                                                </tr>
                                            ))}
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {table.getRowModel().rows.map(row => (
                                                <tr key={row.id}>
                                                    {row.getVisibleCells().map(cell => (
                                                        <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                                                            {flexRender(
                                                                cell.column.columnDef.cell,
                                                                cell.getContext()
                                                            )}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {!isLoading && !error && (
                                <div className="mt-4">
                                    <Pagination
                                        currentPage={currentPage}
                                        onPageChange={handlePageChange}
                                        totalPages={Math.ceil(users.length / 10) || 1} // Ensure correct total pages
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for create/edit user */}
            <UserModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={onSubmit}
                user={editingUser}
                setData={setData} 
                data={data} 
                reset={reset}
            />
        </Authenticated>
    );
};

export default Index;
