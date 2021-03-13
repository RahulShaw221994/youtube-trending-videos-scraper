const videosAPi = 'http://localhost:3000/api';
const videosList = `${videosAPi}/videosList`;
const videosListUpdate = `${videosAPi}/videosListUpdate`;
const videoDetails = `${videosAPi}/videoDetails/`;
const options = {};
document.addEventListener("DOMContentLoaded", () => {
    const pageName = window.location.pathname.split("/").slice(-1)[0]
    if (pageName === 'video-list.html') {
        options.method = "GET";
        fetchVideoList(videosList, options);
    }
    if (pageName === 'video-details.html') {
        const urlParams = new URLSearchParams(window.location.search);
        const videoId = urlParams.get('videoId');
        fetchVideoDetails(videoDetails, videoId)
    }

});

async function fetchVideoList(apiUrl, options) {
    try {
        document.getElementById('reloadButton').disabled = true;
        document.getElementById("videoList").innerHTML = '';
        let response = await fetch(apiUrl, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            const videosList = await response.json();
            let videoCards = '';
            for (let i = 0; i < videosList.videos.length; i++) {
                videoCards += `
                <div class="col-lg-3 col-md-4 card-col">
                <div class="card h-100">
                <img src="${videosList.videos[i].videoThumbnail}" class="card-img-top" alt="video-thumbnail">
                <div class="card-body">
                    <h6 class="card-title">${videosList.videos[i].videoTitle}</h6>
                    <a id="${videosList.videos[i].videoId}" class="stretched-link"
                     onclick="openVideoDetails(event)"></a>
                </div>
                <div class="card-footer">
                <span class="text-muted">${videosList.videos[i].channelTitle}</span>
                <span class="text-muted">&#124;</span>
                <span class="text-muted">${videosList.videos[i].videoPublishedTime}</sapn>
              </div>
                </div>
                </div>`;
            }
            document.getElementById("videoList").innerHTML = videoCards;
            document.getElementById('loading').style.display = 'none';
            document.getElementById('reloadButton').disabled = false;

        }
    } catch (error) {
        console.log(error);
    }
}

function reloadVideoList() {
    options.method = "PUT";
    document.getElementById('loading').style.display = 'block';
    fetchVideoList(videosListUpdate, options);

}
async function fetchVideoDetails(apiUrl, videoId) {
    try {
        let response = await fetch(`${apiUrl}${videoId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            const videoDetails = await response.json();
            let videoDetailsCard = '';
            videoDetailsCard += `
            <div class="card mb-3" style="max-width: 440px;">
                <div class="embed-responsive embed-responsive-16by9">
                    <iframe class="embed-responsive-item" src="${videoDetails.video.videoUrl}?autoplay=true" allowfullscreen></iframe>
                </div>
                        <div class="card-body">
                            <h5 class="card-title">${videoDetails.video.videoTitle}</h5>
                            <p class="card-text">${videoDetails.video.videoDescription}</p>
                            <span class="text-muted">${videoDetails.video.videoViewCount}</span>
                            <span class="text-muted">&#124;</span>
                            <span class="text-muted">${videoDetails.video.videoPublishedTime}</sapn>
                            <p class="card-text"><small class="text-muted">${videoDetails.video.channelTitle}</small></p>
                        </div>
                        </div>`;

            document.getElementById("videoDetails").innerHTML = videoDetailsCard;
            document.getElementById('loading').style.display = 'none';
        }
    } catch (error) {
        console.log(error);
    }
}

async function openVideoDetails(e) {
    const videoId = e.target.id;
    window.open(`video-details.html?videoId=${videoId}`, "_self")
}