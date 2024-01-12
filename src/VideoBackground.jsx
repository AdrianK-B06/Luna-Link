import styles from "/src/VideoBackground.module.css";

function VideoBackground() {
  return (
    <div className={styles.videoBackground}>
      <video autoPlay loop muted playsInline>
        <source
          src="public/images/Moon 404 page not found vid.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
}

export default VideoBackground;
