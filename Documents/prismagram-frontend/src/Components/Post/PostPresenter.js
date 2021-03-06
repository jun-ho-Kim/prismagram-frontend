import React from "react";
import styled from "styled-components";
import TextareaAutosize from "react-autosize-textarea";
import { HeartEmpty, HeartFull, Comment as CommentIcon } from "../Icons";
import FatText from "../FatText";
import Avatar from "../Avatar";


const Post = styled.div`
    ${props => props.theme.whiteBox};
    width:100$:
    max-width: 600px;
    margin-bottom: 25px;
    user-select: none;
`;

const Header = styled.header`
    padding: 15px;
    display: flex;
    align-items: center;
`;

const UserColumn = styled.div`
    margin-left: 10px;
`;

const Location = styled.span`
    display: block;
    margin-top: 5px;
    font-size: 12px;
`;

const Files = styled.div`
    position: relative;
    padding-bottom: 65%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex-shrink: 0;
`;

const File = styled.div`
    max-width: 100%;
    width: 100%;
    height: 600px;
    position: absolute;
    top: 0;
    background-image: url(${props => props.src}});
    background-size: cover;
    background-position: center;
    opacity: ${props => (props.showing ? 1 : 0)};
    transition: opacity 0.5s linear;
`;
const Caption = styled.p`
    display: flex;
    /* align-items: flex-start; */
    /* justify-content: flex-start; */
    margin-bottom: 30px;

`

const Button = styled.span`
    cursor: pointer;
`;

const Buttons = styled.div`
    ${Button} {
    &:first-child {
      margin-right: 10px;
    }
  }
  margin-bottom: 10px;
`;
const Meta = styled.div`
    padding: 15px;
`;

const TimeStamp = styled.span`
    font-weight: 400;
    text-transform: uppercase;
    opacity: 0.5;
    display: block;
    font-size: 12px;
    margin: 10px 0px;
    padding-bottom: 10px;
    border-bottom: ${props => props.theme.lightGreyColor} 1px solid;
`;

const Textarea = styled(TextareaAutosize)`
    border: none;
    width: 100%;
    resize: none;
    font-size: 14px;
    &:focus {
        outline: none;
    }
`;

const Comments = styled.ul`
    margin-top: 10px;
`;

const Comment = styled.li`
    display: flex;
    margin-bottom: 7px;
    span {
        margin-right: 10px;
    
    }
`;


export default ({
    user: {username, avatar},
    location,
    caption,
    files,
    isLiked,
    likeCount,
    createdAt,
    comments,
    newComment,
    currentItem,
    toggleLike,
    onKeyPress,
    selfComments
}) => (
    <Post>
        <Header>
            <Avatar size="sm" url={avatar} />
            <UserColumn>
                <FatText text={username} />
                <Location>{location}</Location>
            </UserColumn>
        </Header>
            <Files>
                {files && files.map((file, index) => (
                <File key={file.id} src={file.url} showing={index === currentItem} /> 
                ))};
            </Files>
            <Meta>
                <Caption>
                    {caption}
                </Caption>
                <Buttons>
                    <Button onClick={toggleLike}>
                        {isLiked ? <HeartFull /> : <HeartEmpty />}
                    </Button>
                    <Button>
                        <CommentIcon />
                    </Button>
                </Buttons>
                <FatText text={likeCount === 1 ? `${likeCount} like`: `${likeCount} likes`} />
                {comments && (
                <Comments>
                    {comments.map(comment => (
                        // console.log("comment: ",comment),
                        <Comment key={comment.id}>
                            <FatText text={comment.user.username} />
                            {comment.text}
                        </Comment>
                    ))}
                    {selfComments.map(comment => (
                        console.log("selfcomment:", comment),
                        <Comment key={comment.id}>
                            <FatText key={comment.id} text={comment.user.username} />
                            {comment.text}
                        </Comment>
                    ))}
                </Comments>
                )}
                <Textarea
                    value={newComment.value}
                    onChange={newComment.onChange}
                    placeholder={"Add a comment"}
                    onKeyPress={onKeyPress}
                    />
                <TimeStamp>
                    {createdAt}
                </TimeStamp>
            </Meta>

    </Post>

);