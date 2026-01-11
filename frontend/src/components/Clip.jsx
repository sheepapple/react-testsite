import { useEffect, useRef, useState } from 'react';
import "../css/Clip.css";

function Clip({ clip }) {

    //const iframeRef = useRef(null)
    //const videoRef = useRef(null)
    const playerRef = useRef(null);
    const containerRef = useRef(null);

    const [paused, setPaused] = useState(false);
    const [liked, setLiked] = useState(false);
    //const [isVisible, setIsVisible] = useState(false);


    useEffect(() => {
        if (!window.YT || !window.YT.Player) return;

        playerRef.current = new window.YT.Player(containerRef.current, {
            videoId: clip.youtubeId,
            playerVars: {
                autoplay: 0,
                mute: 1,
                controls: 0,
                loop: 1,
                playlist: clip.youtubeId,
                modestbranding: 1,
                playsinline: 1
            }
        });

        return () => {
            playerRef.current?.destroy();
        };
    }, [clip.youtubeId]);

    useEffect(() => {
        if (!playerRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    playerRef.current.playVideo();
                } else {
                    playerRef.current.pauseVideo();
                }
            },
            { threshold: 0.5 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    function onPause(e) {
        e.preventDefault();
        const player = playerRef.current;
        if (!player) return;

        const state = player.getPlayerState();
        if (state === window.YT.PlayerState.PLAYING) {
            player.pauseVideo();
            setPaused(true);
        } else {
            player.playVideo();
            setPaused(false);
        }
        console.log("clicked!");
    }

    function onActionClick(e) {
        e.preventDefault();
        const div = e.currentTarget;
        console.log(div.className);
        if (div.className === "like-btn") {
            console.log("liked!");
            (liked) ? setLiked(false) : setLiked(true);
        }
    }

    return (
        <div className="clip">
            <div className="clip-overlay">
                <button className="clip-pause-btn" onClick={onPause}>
                    {paused ?
                        <img src="pauseBtnSVG.svg" alt="Pause button for clips" width="80%" height="80%" />
                        : <img src="playBtnSVG.svg" alt="Play button for clips" width="80%" height="80%" />}
                </button>
                <div className="clip-actions">
                    <button className="like-btn" onClick={onActionClick}>
                        {liked ?
                            <img src="heartBtnFillSVG.svg" alt="Liked button for clips" width="80%" height="80%" />
                            : <img src="heartBtnSVG.svg" alt="Like button for clips" width="80%" height="80%" />
                        }
                        <span className="action-count">72.7K</span>
                    </button>
                    <button className="comment-btn">
                        <img src="commentBtnSVG.svg" alt="Comment button for clips" width="80%" height="80%" />
                        <span className="action-count">6.7K</span>
                    </button>
                    <button className="share-btn">
                        <img src="shareBtnSVG.svg" alt="Share button for clips" width="80%" height="80%" />
                        <span className="action-count">2.1K</span>
                    </button>
                </div>
            </div>

            <div ref={containerRef} className="clip-video" />

            <div className="clip-info">
                <div>
                    <h3>{(clip.title) ? clip.title : ""}</h3>
                    <p>{(clip.description) ? clip.description?.substring(0, 100) : ""}</p>
                </div>
                <h4 className="clip-anime">{(clip.channelTitle) ? clip.channelTitle : ""}</h4>
            </div>
        </div>
    );
}

/*
    ref={iframeRef}
    src={clip.url}
    loop
    playsInline
*/
export default Clip;

