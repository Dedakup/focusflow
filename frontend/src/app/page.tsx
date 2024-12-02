export default function Home() {
    {/*const { isAuthenticated, isLoading } = useAuth0();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            router.push(`/dashboard`);
        }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
        return <div>Loading...</div>;
    }*/}

    return (
        <div className="flex items-center justify-center h-screen bg-gray-800">
            <h1 className="text-white text-2xl">Welcome to FocusFlow</h1>
        </div>
    );
} 