import { useState } from 'react';
import { Grid, List, ListItem, Typography, Card, CardContent } from '@mui/material';
import AddDiscussion from './AddDiscussion';
import SeeMore from './SeeMore';
import Paginate from './../../../components/Paginate';

const discussionsData = [
  {
    id: 1,
    topic: "Tại sao chọn .NET?",
    creator: "Minia Doe",
    dateTime: "March 17, 2024 10:00 AM",
    content: ".NET là một nền tảng nguồn mở để xây dựng các ứng dụng trên máy tính để bàn, web và thiết bị di động có thể chạy nguyên bản trên bất kỳ hệ điều hành nào. Hệ thống .NET bao gồm các công cụ, thư viện và ngôn ngữ hỗ trợ phát triển phần mềm hiện đại, có quy mô linh hoạt và..."
  },
  {
    id: 2,
    topic: "ViteJS - Người chơi hệ Hackspeed trong làng Frontend build tools",
    creator: "Jane Smith",
    dateTime: "March 17, 2024 11:30 AM",
    content: "Trước kia khi làm việc với Laravel, Laravel support Vue khá tốt và thứ để giúp mình build phần Vue là webpack built-in Laravel. Việc đó khiến cho khi chúng ta không làm việc với Laravel, thì việc xây dựng 1 cấu trúc dự án Vue nói riêng và Frontend nói chung sẽ mất thời gian vì..."
  },
  {
    id: 3,
    topic: "IT Là Ngành Gì? Công Việc IT Là Làm Gì?",
    creator: "Alice Johnson",
    dateTime: "March 17, 2024 2:45 PM",
    content: "IT có tên đầy đủ của cụm từ Information Technology, trong tiếng Việt thường được gọi là Công nghệ thông tin. Hiểu đơn giản, đây là ngành sử dụng máy tính và các phần mềm để tạo ra, truyền dẫn, lưu trữ và bảo mật thông tin..."
  }
];

export default function DiscussionList() {
  const [discussions] = useState(discussionsData);

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={12} textAlign="center" mb={4}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>Discussions</Typography>
      </Grid>
      <AddDiscussion/>
      <Grid item xs={12} md={8}>
        <List>
          {discussions.map(discussion => (
            <ListItem key={discussion.id} mb={3}>
              <Card sx={{
                width: '100%',
                backgroundColor: '#f7f7f7',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '12px',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)'
                }
              }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {discussion.topic}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {discussion.creator} - {discussion.dateTime}
                  </Typography>
                  <Typography variant="body1" component="p">
                    {discussion.content}
                  </Typography>
                  <SeeMore/>
                </CardContent>
              </Card>
            </ListItem>
          ))}
        </List>
        <Grid container justifyContent="center" alignItems="center" paddingTop={5}>
            <Paginate count={10}/>
        </Grid>
      </Grid>
    </Grid>   
  );
}
