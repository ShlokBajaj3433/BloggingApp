import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
  
    if (posts.length === 0) {
    return (
        <div className="w-full py-8">
            <Container>
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-text-primary mb-2">Welcome to Our Blog!</h1>
                    <p className="text-lg text-text-secondary mb-4">Sign up or log in to see the latest articles.</p>
                    {/* You can add login/signup buttons here */}
                </div>
            </Container>
        </div>
    );
}
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home