import React, { useEffect, useState } from 'react';
import appwriteService from '../appwrite/config'; // Ensure this is correctly imported
import { Container, PostCard } from '../Components'; // Correct component imports

function Home() {
    const [posts, setPosts] = useState([]); // Correct state initialization

    useEffect(() => {
        appwriteService.getPost().then((response) => {
            if (response) {
                setPosts(response.documents); // Set the posts
            }
        });
    }, []);

    // Conditional rendering when no posts are available
    if (posts.length === 0) {
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <div className='flex flex-wrap'>
                        <div className='p-2 w-full'>
                            <h1 className='text-3xl font-bold hover:text-gray-500'>
                                Log in to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    // Main content when posts are available
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='py-2 w-1/2'>
                            <PostCard post={post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
