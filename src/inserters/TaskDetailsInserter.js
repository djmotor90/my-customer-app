import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import '../css/TaskDetailsInserter.css'; // Make sure this path matches the location of your CSS file

function TaskDetailsInserter() {
  const { taskId } = useParams();
  const [taskDetails, setTaskDetails] = useState(null);
  const selectedWorkspaceId = useSelector((state) => state.workspace.selectedWorkspaceId);
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  const [workspaceData, setWorkspaceData] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const [newCommentText, setNewCommentText] = useState('');
  const [newCommentFile, setNewCommentFile] = useState(null);

  // Fetch Workspace Details
  useEffect(() => {
    const fetchWorkspaceDetails = async () => {
      if (selectedWorkspaceId && token) {
        try {
          const response = await axios.get(`/api/workspace/space/${selectedWorkspaceId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setWorkspaceData(response.data);
        } catch (error) {
          console.error('Error fetching workspace details:', error);
        }
      }
    };

    fetchWorkspaceDetails();
  }, [selectedWorkspaceId, token]);

  // Fetch User Email
  useEffect(() => {
    const fetchUserEmail = async () => {
      if (userId && token) {
        try {
          const response = await axios.get(`/api/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUserEmail(response.data.email);
        } catch (error) {
          console.error('Error fetching user email:', error);
        }
      }
    };

    fetchUserEmail();
  }, [userId, token]);

  useEffect(() => {
    // Fetch Task Details
    const fetchTaskDetails = async () => {
      if (workspaceData && workspaceData.api) {
        try {
          const response = await axios.get(`https://api.clickup.com/api/v2/task/${taskId}`, {
            headers: { Authorization: workspaceData.api },
          });
          setTaskDetails(response.data);
        } catch (error) {
          console.error('Error fetching task details:', error);
        }
      }
    };

    fetchTaskDetails();
  }, [taskId, workspaceData]);

  useEffect(() => {
    // Initial Fetch for Chat Messages
    fetchChatMessages();
  }, [taskId, workspaceData]);

  const fetchChatMessages = async (loadMore = false) => {
    if (!workspaceData || !workspaceData.api || (loadingMore && !loadMore) || !canLoadMore) return;

    setLoadingMore(true);
    try {
      const lastComment = chatMessages[chatMessages.length - 1];
      const response = await axios.get(`https://api.clickup.com/api/v2/task/${taskId}/comment`, {
        headers: { Authorization: workspaceData.api },
        params: loadMore && lastComment ? {
          start: lastComment.date,
          start_id: lastComment.id,
        } : {},
      });
      const newComments = response.data.comments;
      if (newComments.length > 0) {
        setChatMessages(loadMore ? [...chatMessages, ...newComments] : newComments);
      } else {
        setCanLoadMore(false);
      }
    } catch (error) {
      console.error('Error fetching chat messages:', error);
    } finally {
      setLoadingMore(false);
    }
  };

// Helper functions
function extractUrls(text) {
  const urlRegex = /https?:\/\/[^\s]+/gi;
  const matches = text.match(urlRegex);
  return matches || [];
}

function isFileUrl(url) {
  const fileExtensions = /\.(jpg|jpeg|png|gif|csv|docx|pdf|mp4|mp3|doc|docm|dotx|dotm|xls|xlsx|xlsm|xlsb|ppt|pptx|pptm|pps|ppsx|ppsm|odt|odp|ods|pdf|ai|psd|indd|zip|rar|txt|html|css|js|py)$/i;
  return fileExtensions.test(url);
}

function renderCommentText(commentText, fileUrls = []) {
  if (!commentText) return null;

  // Remove file URLs from the comment text
  let filteredText = commentText;
  fileUrls.forEach(url => {
    filteredText = filteredText.replace(url, '');
  });

  const lines = filteredText.split('\n');
  const filteredLines = lines.filter(line => !line.includes('chunkbase') && line.trim() !== '');

  return filteredLines.map((line, index) => (
    <React.Fragment key={index}>
      {index > 0 && <br />}
      {line}
    </React.Fragment>
  ));
}

function renderCommentWithImagesAndText(commentText) {
  const urls = extractUrls(commentText);
  const fileUrls = urls.filter(isFileUrl);

  const imagesAndLinks = [];

  urls.forEach((url) => {
    if (isFileUrl(url)) {
      const isImage = /\.(jpg|jpeg|png|gif)$/i.test(url);
      const downloadLink = <a href={url} download className="download-link">Download</a>;
  
      let imageOrLink = null;
  
      if (isImage) {
        const imageElement = <img src={url} alt="attachment" className="comment-image" />;
        imageOrLink = (
          <div className="image-or-file-link-container">
            <div className="image-container">
            <div className="content-container">{imageElement}</div>
            </div>
            <div className='download-link'>
            {downloadLink}
            </div>
          </div>
        );
      } else {
        imageOrLink = (
          <div className="image-or-file-link-container">
            <div className="content-container"><span className="attachment-icon">📎</span></div>
            <div className='download-link'>
            {downloadLink}
            </div>
          </div>
        );
      }
  
      imagesAndLinks.push(imageOrLink);
    }
  });

  // Include the text content in the rendered comment
  const textContent = renderCommentText(commentText, fileUrls);

  // Return a div with textContent followed by imagesAndLinks
  return (
    <div className="comment-content-with-images">
      <div className="text-content">
        {textContent}
      </div>
      <div className="image-links-container">
        {imagesAndLinks.map((item, index) => (
          <div key={index} className="image-or-link">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
  






  // Code for the sent message
  const handleCommentTextChange = (e) => {
    setNewCommentText(e.target.value);
  };

  const handleCommentFileChange = (e) => {
    setNewCommentFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newCommentText.trim() || newCommentFile) {
      console.log(workspaceData.api);
      const formData = new FormData();
      formData.append('comment_text', newCommentText);

      if (newCommentFile) {
        formData.append('attachment', newCommentFile);

        try {
          // Upload attachment first and get its ID
          const attachmentResponse = await axios.post(
            `https://api.clickup.com/api/v2/task/${taskId}/attachment`,
            formData,
            {
              headers: { Authorization: workspaceData.api, 'Content-Type': 'multipart/form-data' },
            }
          );
            console.log(attachmentResponse.data.url)
          // Create a comment with the attachment ID
          const commentText = `From: ${userEmail}\n\nMessage:\n${newCommentText}\n\nAttachments:\n${attachmentResponse.data.url}`;

          const commentData = {
            comment_text: commentText,
          };
          
            console.log(commentData)
          await axios.post(`https://api.clickup.com/api/v2/task/${taskId}/comment`, commentData, {
            headers: { Authorization: workspaceData.api },
          });

          // After posting a comment with an attachment, refresh the chat messages
          fetchChatMessages();
          setNewCommentText('');
          setNewCommentFile(null);
        } catch (error) {
          console.error('Failed to post comment with attachment:', error);
        }
      } else {
        // If no attachment, post a regular comment
        try {
          await axios.post(`https://api.clickup.com/api/v2/task/${taskId}/comment`, formData, {
            headers: { Authorization: workspaceData.api, 'Content-Type': 'application/json' },
          });

          // After posting a comment, refresh the chat messages
          fetchChatMessages();
          setNewCommentText('');
        } catch (error) {
          console.error('Failed to post comment:', error);
        }
      }
    }
  };

  const chatBubbles = chatMessages
  .filter((message) => !message.comment_text.toLowerCase().includes('//private//'))
  .map((message, index) => (
    <div
      key={message.id}
      className={`chat-container ${index % 2 === 0 ? 'chat-left' : 'chat-right'}`}
    >
      <div className="chat-comment">
        <div className="comment-user">{message.user.username}</div>
        <div className="comment-text">
          {renderCommentWithImagesAndText(message.comment_text, message.comment)}
        </div>
        <div className="attachment-previews">
          {message.comment
            .filter((item) => item.type === 'attachment')
            .map((attachment, attachmentIndex) => {
              const isImageURL = /\.(jpg|jpeg|png|gif)$/i.test(attachment.attachment.url);
              return (
                <div key={attachmentIndex} className="comment-attachment">
                  {isImageURL ? (
                    <a href={attachment.attachment.url} target="_blank" rel="noopener noreferrer">
                      <img
                        src={attachment.attachment.url}
                        alt={attachment.attachment.title}
                        className="attachment-preview"
                      />
                    </a>
                  ) : (
                    <div className="attachment-icon">📎</div>
                  )}
                  <div className="attachment-title">
                    <a href={attachment.attachment.url} target="_blank" rel="noopener noreferrer">
                      {attachment.attachment.title || 'Attachment'}
                    </a>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="comment-date">
          {new Date(parseInt(message.date)).toLocaleString()}
        </div>
      </div>
    </div>
  ));




  return (
    <div className="task-details-inserter-container">
      {taskDetails && (
        <div className="task-card">
          <div className="task-card-header">
            <h5 className="task-title">{taskDetails.name}</h5>
          </div>
          <div className="task-card-bodies-container">
            <div className="task-card-body">
              <h4 className="task-subtitle">Description</h4>
              <div className="task-description">{renderCommentText(taskDetails.description)}</div>
            </div>
            <div className="task-card-body">
              <h4 className="task-subtitle">Additional Information</h4>
              <div className="task-description">
                <span className="user-email">{userEmail}</span>
              </div>
            </div>
          </div>
          <div className="task-chat-body">
            <h4 className="task-subtitle">Chat</h4>
            {chatBubbles}
            {canLoadMore && (
              <button onClick={() => fetchChatMessages(true)} className="load-more-button" disabled={loadingMore}>
                {loadingMore ? 'Loading...' : 'Load More Comments'}
              </button>
            )}

            <form onSubmit={handleSubmit} className="send-message-form">
              <textarea value={newCommentText} onChange={handleCommentTextChange} placeholder="Write your comment here..."></textarea>
              <input type="file" onChange={handleCommentFileChange} />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskDetailsInserter;
