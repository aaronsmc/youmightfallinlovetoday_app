import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import UserCard from "@/components/cards/UserCard";
import SearchBar from "@/components/shared/SearchBar";

async function Page({ searchParams }: { searchParams: { q: string } }) {
    const user = await currentUser();
    if(!user) return null;

    const userInfo = await fetchUser(user.id);
    if(!userInfo?.onboarded) redirect("/onboarding");

    // Fetch users with search parameter
    const results = await fetchUsers({
        userId: user.id,
        searchString: searchParams.q || "",
        pageNumber: 1,
        pageSize: 25,
    });

    return (
        <section>
            <h1 className="head-text mb-10">Search</h1>

            <SearchBar routeType="search" />

            <div className="mt-14 flex flex-col gap-9">
                {results.users.length === 0 ? (
                    <p className="no-result">No users found</p>
                ) : (
                    <>
                    {results.users.map((person) => (
                        <UserCard 
                            key={person.id}
                            id={person.id}
                            name={person.name}
                            username={person.username}
                            imgUrl={person.image}
                            personType="User"
                        />
                    ))}
                    </>
                )}
            </div>
        </section>
    )
}

export default Page;
