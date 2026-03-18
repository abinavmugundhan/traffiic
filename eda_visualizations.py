import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import warnings
warnings.filterwarnings('ignore')

def generate_visualizations():
    print("🎨 Generating Data Visualization Charts for Datathon Presentation...")
    
    try:
        df = pd.read_csv('Metro_Interstate_Traffic_Volume.csv.gz')
    except Exception as e:
        print("Dataset not found. Please run get_traffic_data.py first.")
        return

    df['date_time'] = pd.to_datetime(df['date_time'])
    df['hour'] = df['date_time'].dt.hour
    df['day_of_week'] = df['date_time'].dt.dayofweek
    df['day_name'] = df['date_time'].dt.day_name()
    
    # Set plotting style suitable for Smart City Dashboards
    plt.style.use('dark_background')
    
    # -------------------------------------------------------------
    # 1. Traffic Volume by Hour of Day (Line Chart)
    # -------------------------------------------------------------
    plt.figure(figsize=(10, 6))
    sns.lineplot(data=df, x='hour', y='traffic_volume', ci=None, color='#3b82f6', linewidth=2)
    plt.title('Average Urban Traffic Volume Throughout the Day', fontsize=16, pad=15)
    plt.xlabel('Hour of Day (0-23)', fontsize=12)
    plt.ylabel('Vehicle Count (Volume)', fontsize=12)
    plt.grid(alpha=0.2, color='#ffffff')
    plt.tight_layout()
    plt.savefig('hourly_traffic_volume.png', dpi=300, facecolor='#0f172a', edgecolor='none')
    print("✅ Created: hourly_traffic_volume.png (Shows peak hours)")
    plt.close()
    
    # -------------------------------------------------------------
    # 2. Traffic Congestion Heatmap (Hour vs Day of Week)
    # -------------------------------------------------------------
    plt.figure(figsize=(12, 6))
    heatmap_data = df.groupby(['day_name', 'hour'])['traffic_volume'].mean().unstack()
    
    # Enforce chronological ordering of days
    days_order = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    heatmap_data = heatmap_data.reindex(days_order)
    
    ax = sns.heatmap(heatmap_data, cmap='YlOrRd', annot=False, linewidths=.5, linecolor='#1e293b')
    plt.title('Congestion Hotspot Heatmap: Day of Week vs Hour', fontsize=16, pad=15)
    plt.xlabel('Hour of Day', fontsize=12)
    plt.ylabel('Day of Week', fontsize=12)
    plt.tight_layout()
    plt.savefig('traffic_heatmap.png', dpi=300, facecolor='#0f172a', edgecolor='none')
    print("✅ Created: traffic_heatmap.png (Fulfills Hotspot Mapping Req)")
    plt.close()
    
    # -------------------------------------------------------------
    # 3. Weather Impact on Traffic (Violin Plot for High Impact)
    # -------------------------------------------------------------
    plt.figure(figsize=(14, 6))
    
    # Filter for major weather events for a cleaner, more impactful graph
    major_weather = ['Clear', 'Clouds', 'Rain', 'Snow', 'Mist', 'Thunderstorm']
    df_filtered = df[df['weather_main'].isin(major_weather)]
    
    sns.violinplot(data=df_filtered, x='weather_main', y='traffic_volume', palette='magma', inner="quart")
    
    plt.title('Impact of Severe Environmental Anomalies on Traffic Volume', fontsize=18, pad=15, fontweight='bold', color='#ef4444')
    plt.xlabel('Weather Condition', fontsize=14, labelpad=10)
    plt.ylabel('Vehicle Density Distribution', fontsize=14, labelpad=10)
    plt.xticks(rotation=0, fontsize=12)
    plt.tight_layout()
    
    plt.savefig('weather_anomaly_impact.png', dpi=300, facecolor='#0f172a', edgecolor='none')
    print("✅ Created: weather_anomaly_impact.png (Fulfills Anomaly Insight Req - Upgraded for High Impact)")
    plt.close()
    
    print("\n🎉 All Exploratory Data Analysis (EDA) charts have been rendered and saved!")
    print("You can attach these .png files directly into your presentation slides.")

if __name__ == "__main__":
    generate_visualizations()
