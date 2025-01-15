using greenshop_api.Authority;
using greenshop_api.Data;
using greenshop_api.Services;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("GreenshopManagement");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
});
builder.Services.AddTransient<NewsletterService>();
builder.Services.AddMvc();

builder.Services.AddCors(options =>
{
    if (builder.Environment.IsDevelopment())
    {
        options.AddPolicy("DefaultPolicy", policy =>
            policy.WithOrigins(
                "http://localhost:5173", 
                "http://localhost:3000",
                "http://127.0.0.1:5173",
                "http://127.0.0.1:3000")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .SetIsOriginAllowedToAllowWildcardSubdomains()
            .AllowCredentials()
        );
        options.AddPolicy("WithCredentialsPolicy", policy =>
           policy.WithOrigins(
               "http://localhost:5173",
               "http://localhost:3000",
               "http://127.0.0.1:5173",
               "http://127.0.0.1:3000")
           .AllowAnyMethod()
           .AllowAnyHeader()
           .AllowCredentials()
        );
    }
});

builder.Services.AddAutoMapper(typeof(Program));

builder.Services.AddControllers()
    .AddNewtonsoftJson(options =>
    {
        options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
        options.SerializerSettings.PreserveReferencesHandling = PreserveReferencesHandling.None;
        options.SerializerSettings.Formatting = Formatting.None;
    });
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<JwtService>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();

app.UseCors("DefaultPolicy");

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();

//svuda samo koristi userId iz tokena, to promeni u metodama
//mapiraj korpu kako treba
//dodaj metodu za dobijanje svih reviews za jedan plant
//podesi max quantity za cart
//obrisi nekoriscene bibl  komentare
