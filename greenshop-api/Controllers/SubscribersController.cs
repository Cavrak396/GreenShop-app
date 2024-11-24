using greenshop_api.Data;
using greenshop_api.Filters.ActionFilters.Subscriber_ActionFilters;
using greenshop_api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace greenshop_api.Controllers
{
    [ApiController]
    [Route("/[controller]")]
    public class SubscribersController : ControllerBase
    {
        private readonly ApplicationDbContext db;

        public SubscribersController(ApplicationDbContext db)
        {
            this.db = db;
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
            int identityPart = (await this.db.Plants.MaxAsync(i => (int?)i.PlantId % 10000) ?? 0) + 1;

            subscriber.SubscriberId = ApplicationDbContext.GenerateId(identityPart);

            this.db.Subscribers.Add(subscriber);
            await this.db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSubscribers),
                new { id = subscriber.SubscriberId },
                subscriber);
        }

        [HttpDelete("{id}")]
        [TypeFilter(typeof(Subscriber_ValidateSubscriberIdFilterAttribute))]
        public async Task<IActionResult> DeleteSubscriber(string id)
        {
            var subscriberToDelete = await this.db.Subscribers.FindAsync(id);

            db.Subscribers.Remove(subscriberToDelete);
            db.SaveChanges();

            return Ok(subscriberToDelete);
        }
    }
}
