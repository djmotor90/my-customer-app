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
  

  useEffect(() => {
    // Fetch Workspace Details
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

  useEffect(() => {
    // Fetch User Email
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

  function renderCommentText(commentText) {
    if (!commentText) return null;
    const lines = commentText.split('\n');
    const filteredLines = lines.filter(line => !line.includes('chunkbase'));
    return filteredLines.map((line, index) => (
      <React.Fragment key={index}>
        {index > 0 && <br />}
        {line}
      </React.Fragment>
    ));
  }

 // Render chat messages in reverse order with left and right pattern
const chatBubbles = chatMessages
.filter((message) => !message.comment_text.toLowerCase().includes('//private//'))
.map((message, index) => (
  <div
    key={message.id} // Use comment ID as the key
    className={`chat-container ${index % 2 === 0 ? 'chat-left' : 'chat-right'}`}
  >
    <div className="chat-comment">
      <div className="comment-user">{message.user.username}</div>
      {/* <div className="comment-user">{message.id}</div>
      <div className="comment-user">{message.date}</div> */}
      {/* Display text comment at the top */}
      <div className="comment-text">
        {renderCommentText(message.comment_text)}
      </div>

      {/* Display attachments at the bottom */}
      <div className="attachment-previews">
        {message.comment
          .filter((item) => item.type === 'attachment')
          .map((attachment, attachmentIndex) => (
            <div key={attachmentIndex} className="comment-attachment">
              {attachment.attachment.extension === 'png' ||
              attachment.attachment.extension === 'jpg' ||
              attachment.attachment.extension === 'jpeg' ? (
                // Display image preview if it's an image
                <>
                  <a href={attachment.attachment.url} target="_blank" rel="noopener noreferrer">
                    <img
                      src={attachment.attachment.thumbnail_medium || attachment.attachment.url} // Use the thumbnail or full image URL
                      alt={attachment.attachment.title}
                      className="attachment-preview"
                    />
                  </a>
                </>
              ) : (
                // Display a generic file icon if it's not an image
                <div className="attachment-icon">📎</div>
              )}
              {/* Display the attachment title at the bottom */}
              <div className="attachment-title">
                <a href={attachment.attachment.url} target="_blank" rel="noopener noreferrer">
                  {attachment.attachment.title || 'Attachment'} {/* Add default title */}
                </a>
              </div>
            </div>
          ))}
      </div>

      {/* Display the comment date */}
      <div className="comment-date">
        {new Date(parseInt(message.date)).toLocaleString()} {/* Convert timestamp to human-readable date */}
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
              {/* Add content for the new task-card-body here */}
            </div>
          </div>
        </div>
        <div className="task-chat-body">
          {/* This is older version */}
          {/* <h4 className="task-subtitle">Chat</h4>
          <div className="chat-container">{chatBubbles}</div> */}

          {/* This is newer version */}
          <h4 className="task-subtitle">Chat</h4>
          {chatBubbles}
          {canLoadMore && (
            <button onClick={() => fetchChatMessages(true)} className="load-more-button" disabled={loadingMore}>
              {loadingMore ? 'Loading...' : 'Load More Comments'}
            </button>
          )}
        </div>
        
      </div>
    )}
  </div>
);
}

export default TaskDetailsInserter;
