import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container, Loader } from "../components"; // Assuming a Loader component exists
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userid === userData.$id : false;

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            setError("");
            try {
                if (slug) {
                    const fetchedPost = await appwriteService.getPost(slug);
                    if (fetchedPost) {
                        setPost(fetchedPost);
                    } else {
                        setError("Post not found. Redirecting to home...");
                        setTimeout(() => navigate("/"), 3000);
                    }
                } else {
                    navigate("/");
                }
            } catch (err) {
                setError("Failed to fetch the post. Please try again later.");
                console.error("Fetch Post Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug, navigate]);

    const handleDeletePost = async () => {
        setShowConfirmModal(false);
        if (!post) return;

        try {
            const fileDeleted = await appwriteService.deleteFile(post.featuredImage);
            if (fileDeleted) {
                await appwriteService.deletePost(post.$id);
                navigate("/");
            }
        } catch (err) {
            setError("Failed to delete the post.");
            console.error("Delete Post Error:", err);
        }
    };

    // Show a loader while fetching data
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader /> {/* Or any loading spinner component */}
            </div>
        );
    }

    // Show an error message if something went wrong
    if (error) {
        return (
            <div className="py-8 text-center text-red-500">
                <Container>
                    <h1 className="text-2xl font-bold">{error}</h1>
                </Container>
            </div>
        );
    }
    
    // Render the post if it exists
    return post ? (
        <div className="py-8 bg-gray-50 dark:bg-gray-900 font-sans">
            <Container>
                <article className="max-w-4xl mx-auto">
                    {/* Featured Image */}
                    <div className="w-full flex justify-center mb-6 relative rounded-xl overflow-hidden shadow-lg">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="w-full h-auto object-cover"
                        />
                    </div>

                    {/* Author Controls */}
                    {isAuthor && (
                        <div className="text-center mb-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3 hover:bg-green-600 transition-colors duration-200">
                                    ✏️ Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={() => setShowConfirmModal(true)} className="hover:bg-red-600 transition-colors duration-200">
                                🗑️ Delete
                            </Button>
                        </div>
                    )}

                    {/* Post Title */}
                    <div className="w-full text-center mb-4">
                        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
                            {post.title}
                        </h1>
                    </div>

                    {/* Post Meta */}
                    <div className="text-center text-sm text-gray-500 dark:text-gray-400 mb-8">
                        <span>Published on {new Date(post.$createdAt).toLocaleDateString()}</span>
                        {/* Assuming you have an 'authorName' field in your document */}
                        {post.authorName && <span> by {post.authorName}</span>}
                    </div>

                    {/* Post Content */}
                    <div className="prose prose-lg max-w-none dark:prose-invert">
                        {parse(post.content)}
                    </div>
                </article>
            </Container>

            {/* Confirmation Modal */}
            {showConfirmModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl text-center">
                        <h2 className="text-xl font-bold mb-4 dark:text-white">Confirm Deletion</h2>
                        <p className="mb-6 dark:text-gray-300">Are you sure you want to delete this post? This action cannot be undone.</p>
                        <div className="flex justify-center gap-4">
                            <Button onClick={() => setShowConfirmModal(false)} bgColor="bg-gray-500">
                                Cancel
                            </Button>
                            <Button onClick={handleDeletePost} bgColor="bg-red-600">
                                Confirm Delete
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    ) : null;
}