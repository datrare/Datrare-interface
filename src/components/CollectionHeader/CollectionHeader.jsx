import "./collectionHeader.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ThemeContext from "../../context/ThemeContext";
import DialogMessage from "../DialogMessage/DialogMessage";
import CollectionDescription from "../CollectionDescription/CollectionDescription";

const CollectionHeader = ({
    dataLength,
    imgSrc,
    collectionId,
    twitter,
    discord,
}) => {
    const [noOflikes, setNoOfLikes] = useState(0);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [dialogMessage, setDialogMessage] = useState({
        status: "",
        message: "",
    });
    const [likedCollectionId, setLikedCollectionId] = useState();
    const { isDarkMode } = useContext(ThemeContext);

    const handleLike = async () => {
        if (likedCollectionId) {
            setDialogMessage({
                status: "failed",
                message: "Ouch! Already Voted for collection",
            });
            return;
        }
        try {
            await axios.post(
                `${process.env.REACT_APP_API_URL}/collection-like`,
                {
                    collectionId: collectionId,
                }
            );
            setDialogMessage({
                status: "success",
                message: "Hooray! Your vote is added",
            });
            setLikedCollectionId(collectionId);
            console.log("Like recorded successfully");
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDialogMessage({
                status: "",
                message: "",
            });
        }, 2500);
        return () => clearTimeout(timeout);
    }, [dialogMessage]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/collections/${collectionId}`
            );
            const data = await response.json();
            console.log(data);
            setNoOfLikes(data.total_likes);
            setName(data.collection_name);
            setDescription(data.description);
        };
        fetchData();
        const fetchCheckLikeData = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/collection-like/check-like`
                );
                console.log(response.data);
                setLikedCollectionId(
                    response.data[0] ? response.data[0].collection_id : null
                );
            } catch (error) {
                console.error("Error fetching check-like data:", error);
            }
        };

        fetchCheckLikeData();
    }, []);

    return (
        <>
            {dialogMessage.status && <DialogMessage message={dialogMessage} />}
            <div
                className={`collection-header ${isDarkMode ? "dark" : "light"}`}
            >
                <div class="card">
                    <img src={imgSrc} alt="Logo" />
                    <div>
                        <h1>
                            {name}
                            <FontAwesomeIcon
                                className="verified"
                                icon={faCircleCheck}
                                size="2xs"
                                style={{ color: "#1DA1F2" }}
                                title="Verified Collection"
                            />
                            
                        </h1>
                        <CollectionDescription description={description} />
                        <div class="info-container">

                            <div>
                                <p style={{ display: "inline-block", marginRight: "1rem" }}>Items: {dataLength}</p>
                                 <p style={{ display: "inline-block" }}>Total Votes: {noOflikes}</p>
                        </div>
                            <div>
                                <a
                                    href={twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Twitter
                                    <FontAwesomeIcon icon={faTwitter} />
                                </a>
                                <a
                                    href={discord}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Discord
                                    <FontAwesomeIcon icon={faDiscord} />
                                </a>
                                <button onClick={handleLike} className="vote-button">
    Vote{likedCollectionId === collectionId ? "d" : ""}
</button>


                            
                            </div>
                        </div>
                        
                    </div>
                </div>
                
            </div>
        </>
    );
};

export default CollectionHeader;
