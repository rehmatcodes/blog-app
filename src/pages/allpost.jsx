import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../Components'; // Corrected component imports
import appwriteService from '../appwrite/config'; // Ensure this is correctly imported

function AllPost() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        appwriteService.getPost().then((response) => {
            if (response) {
                setPosts(response.documents);
            }
        });
    }, []); // Add a dependency array to run this effect only once

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard post={post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default AllPost;
