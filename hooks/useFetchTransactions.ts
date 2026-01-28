import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { TransactionType } from '@/types';
import { useAuth } from './useAuth';

export const useFetchTransactions = (limitCount?: number) => {
    const { user } = useAuth();
    const [transactions, setTransactions] = useState<TransactionType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!user?.uid) return;

        setLoading(true);

        const q = query(
            collection(db, "transactions"),
            where("uid", "==", user.uid),
            orderBy("date", "desc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                date: doc.data().date?.toDate() 
            })) as TransactionType[];

            setTransactions(data);
            setLoading(false);
        }, (err) => {
            console.error("Error fetching transactions:", err);
            setError(err.message);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user?.uid]);

    return { transactions, loading, error };
};