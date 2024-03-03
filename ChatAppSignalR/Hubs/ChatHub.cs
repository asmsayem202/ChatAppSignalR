using Microsoft.AspNetCore.SignalR;

namespace ChatAppSignalR.Hubs
{
	public class ChatHub : Hub
	{
		public async Task ShareText(string user, string message)
		{
			await Clients.All.SendAsync("msgRcv", user, message);

		}

		public async Task ShareImage(string user, string imageData)
		{
			await Clients.All.SendAsync("imgRcv", user, imageData);

		}

		public override Task OnConnectedAsync()
		{
			return base.OnConnectedAsync();
		}

		public override Task OnDisconnectedAsync(Exception? exception)
		{
			return base.OnDisconnectedAsync(exception);
		}
	}
}
