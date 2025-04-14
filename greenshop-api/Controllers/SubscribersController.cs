using greenshop_api.Application.Models;
using greenshop_api.Domain.Interfaces.Service;
using greenshop_api.Domain.Models;
using greenshop_api.Filters.ActionFilters.Subscriber_ActionFilters;
using greenshop_api.Infrastructure.Persistance;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace greenshop_api.Controllers
{
    [ApiController]
    [Route("/[controller]")]
    public class SubscribersController : ControllerBase
    {
        private readonly ApplicationDbContext db;
        private readonly INewsletterService newsletterService;

        public SubscribersController(ApplicationDbContext db, INewsletterService newsletterService)
        {
            this.db = db;
            this.newsletterService = newsletterService;
        }

        [HttpGet]
        public async Task<IActionResult> GetSubscribers()
        {
            var subscribers = await this.db.Subscribers.ToListAsync();

            return Ok(subscribers);
        }

        [HttpPost]
        [TypeFilter(typeof(Subscriber_ValidateCreateSubscriberActionFilter))]
        public async Task<IActionResult> CreateSubscriber([FromBody]Subscriber subscriber)
        {
            subscriber.SubscriberId = Guid.NewGuid().ToString();

            this.db.Subscribers.Add(subscriber);
            await this.db.SaveChangesAsync();

            await this.newsletterService.SendNewsletterAsync(
                "subscription",
                new NewsletterHeader
                {
                    Recipient = subscriber.SubscriberEmail
                });

            return NoContent();
        }

        [HttpDelete("{subscriberId}")]
        [TypeFilter(typeof(Subscriber_ValidateSubscriberIdActionFilter))]
        public async Task<IActionResult> DeleteSubscriber([FromRoute]string subscriberId)
        {
            var subscriberToDelete = await this.db.Subscribers.FindAsync(subscriberId);

            this.db.Subscribers.Remove(subscriberToDelete!);
            await this.db.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete]
        [TypeFilter(typeof(Subscriber_ValidateDeleteSubscribersActionFilter))]
        public async Task<IActionResult> DeleteAllSubscribers()
        {
            var allSubscribers = this.db.Subscribers.ToList();

            this.db.Subscribers.RemoveRange(allSubscribers);
            await this.db.SaveChangesAsync();

            return NoContent();
        }
    }
}
