using greenshop_api.Data;
using greenshop_api.Filters.ActionFilters.Subscriber_ActionFilters;
using greenshop_api.Models;
using greenshop_api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace greenshop_api.Controllers
{
    [ApiController]
    [Route("/[controller]")]
    public class SubscribersController : ControllerBase
    {
        private readonly ApplicationDbContext db;
        private readonly NewsettlerService newsettlerService;

        public SubscribersController(ApplicationDbContext db, NewsettlerService newsettlerService)
        {
            this.db = db;
            this.newsettlerService = newsettlerService;
        }

        [HttpGet]
        public async Task<IActionResult> GetSubscribers()
        {
            var subscribers = await this.db.Subscribers.ToListAsync();

            return Ok(subscribers);
        }

        [HttpPost]
        [TypeFilter(typeof(Subscriber_ValidateCreateSubscriberFilterAttribute))]
        public async Task<IActionResult> CreateSubscriber([FromBody]Subscriber subscriber)
        {
            subscriber.SubscriberId = Guid.NewGuid().ToString();

            this.db.Subscribers.Add(subscriber);
            await this.db.SaveChangesAsync();

            await newsettlerService.SendNewsettlerMessage(
                subscriber.SubscriberEmail,
                "Welcome to Miso Greenshop Newsettler!",
                "You will never miss a thing from now on!",
                "We are so happy to have you here! Whenever there is a new product " +
                "in our store, you will be informed right away. This way, you can purchase " +
                "the plant while it's still in stock with the best prize."
            );

            return CreatedAtAction(nameof(GetSubscribers),
                new { id = subscriber.SubscriberId },
                subscriber);
        }

        [HttpDelete("{subscriberId}")]
        [TypeFilter(typeof(Subscriber_ValidateSubscriberIdFilterAttribute))]
        public async Task<IActionResult> DeleteSubscriber(string subscriberId)
        {
            var subscriberToDelete = await this.db.Subscribers.FindAsync(subscriberId);

            this.db.Subscribers.Remove(subscriberToDelete);
            await this.db.SaveChangesAsync();

            return Ok(subscriberToDelete);
        }

        [HttpDelete]
        [TypeFilter(typeof(Subscriber_ValidateDeleteSubscribersFilterAttribute))]
        public async Task<IActionResult> DeleteAllSubscribers()
        {
            var allSubscribers = this.db.Subscribers.ToList();

            this.db.Subscribers.RemoveRange(allSubscribers);
            await this.db.SaveChangesAsync();

            return Ok();
        }
    }
}
