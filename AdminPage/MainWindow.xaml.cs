using Google.Protobuf.WellKnownTypes;
using System.Data;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using static AdminPage.db_config;
using static Google.Protobuf.Reflection.SourceCodeInfo.Types;
using System.Text.RegularExpressions;

namespace AdminPage
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            if (TestConnection())
            {
                InitializeComponent();
                LoadUsersData();
                LoadMessagesData();
                LoadBookingsData();
                LoadParkingSpacesData();
            }
            else
            {
                MessageBox.Show("Nem lehet csatlakozni az adatbázishoz!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                Application.Current.Shutdown(); // Bezárja az alkalmazást
            }

        }

        private bool TestConnection()
        {
            string connectionString = "server=localhost;user=root;password=;database=parking";
            try
            {
                using (var conn = new MySql.Data.MySqlClient.MySqlConnection(connectionString))
                {
                    conn.Open();
                    return true;
                }
            }
            catch
            {
                return false;
            }
        }

        private void LoadAllData_Click(object sender, RoutedEventArgs e)
        {
            LoadUsersData();
            LoadMessagesData();
            LoadBookingsData();
            LoadParkingSpacesData();
        }

        private bool LoadUsersData()
        {
            userTable.ItemsSource = DatabaseHelper.GetData("SELECT * FROM users").DefaultView;
            
            if (userTable.ItemsSource != null) { return true; } else { return false; }
        }
        
        private bool LoadMessagesData()
        {
            messagesTable.ItemsSource = DatabaseHelper.GetData("SELECT * FROM messages").DefaultView;
            
            if (messagesTable.ItemsSource != null) { return true; } else { return false; }
        }

        private bool LoadBookingsData()
        {
            bookingsTable.ItemsSource = DatabaseHelper.GetData("SELECT * FROM bookings").DefaultView;

            if (bookingsTable.ItemsSource != null) { return true; } else { return false; }
        }

        private bool LoadParkingSpacesData()
        {
            parkingTable.ItemsSource = DatabaseHelper.GetData("SELECT * FROM parking_spaces").DefaultView;

            if (parkingTable.ItemsSource != null) { return true; } else { return false; }
        }

        private void AddUser_Click(object sender, RoutedEventArgs e)
        {
            //if (!string.IsNullOrWhiteSpace(tbName.Text) && !string.IsNullOrWhiteSpace(tbEmail.Text) && !string.IsNullOrWhiteSpace(tbPhoneNum.Text) && !string.IsNullOrWhiteSpace(tbPassword.Text))
            //{
            //    string query = $"INSERT INTO users (name, email, phone_num, password) VALUES ('{tbName.Text}', '{tbEmail.Text}', '{tbPhoneNum.Text}', '{tbPassword.Text}')";
            //    DatabaseHelper.ExecuteQuery(query);
            //    LoadUsersData();
            //    ClearUsersFields();
            //}
            //else
            //{
            //    MessageBox.Show("Kérlek, töltsd ki az összes mezőt!");
            //}

            Regex emailRegex = new Regex(
                 @"^(?!.*\.\.)(?!.*[^\x00-\x7F])[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
             );

            Regex phoneRegex = new Regex(
                 @"^\d+$"
             );

            Regex passwordRegex = new Regex(
                @"^(?=.{8,}$)(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])\S+$"
            );

            if (string.IsNullOrWhiteSpace(tbName.Text))
            {
                MessageBox.Show("Név nem lehet üres!");
                return;
            }

            if (string.IsNullOrWhiteSpace(tbEmail.Text))
            {
                MessageBox.Show("Email nem lehet üres!");
                return;
            }

            if (!emailRegex.IsMatch(tbEmail.Text))
            {
                MessageBox.Show("Email formátuma nem megfelelő!");
                return;
            }

            if (string.IsNullOrWhiteSpace(tbPhoneNum.Text))
            {
                MessageBox.Show("Telefonszám nem lehet üres!");
                return;
            }

            if (!phoneRegex.IsMatch(tbPhoneNum.Text))
            {
                MessageBox.Show("Telefonszám csak számot tartalmazhat!");
                return;
            }

            if (string.IsNullOrWhiteSpace(tbPassword.Text))
            {
                MessageBox.Show("Jelszó nem lehet üres!");
                return;
            }

            if (!passwordRegex.IsMatch(tbPassword.Text))
            {
                MessageBox.Show("A jelszónak legalább 8 karakter hosszúnak kell lennie és nem tartalmazhat szóközt és ékezetes karaktereket!\nValamint tartalmaznia kell legalább egy: \n\t- nagybetűt\n\t- kisbetűt\n\t- számot\n\t- speciális karaktert");
                return;
            }

            
        }

        private void AddBooking_Click(object sender, RoutedEventArgs e)
        {
            if (!string.IsNullOrWhiteSpace(tbBookingsUserId.Text) && !string.IsNullOrWhiteSpace(tbBookingsParkingId.Text) && !string.IsNullOrWhiteSpace(dpStartTime.Text) && !string.IsNullOrWhiteSpace(dpEndTime.Text) && !string.IsNullOrWhiteSpace(tbPlateNum.Text))
            {
                string query = $"INSERT INTO bookings (user_id, parking_space_id, start_time, end_time, payment_status, plate_num) VALUES ('{tbBookingsUserId.Text}', '{tbBookingsParkingId.Text}', '{dpStartTime.Text}', '{dpEndTime.Text}', 'fizetve', '{tbPlateNum.Text}')";
                DatabaseHelper.ExecuteQuery(query);
                LoadBookingsData();
                ClearBookingsFields();
            }
            else
            {
                MessageBox.Show("Kérlek, töltsd ki az összes mezőt!");
            }
        }

        private void DeleteUser_Click(object sender, RoutedEventArgs e)
        {
            if (userTable.SelectedItem is DataRowView row)
            {
                int id = Convert.ToInt32(row["id"]);
                string query = $"DELETE FROM users WHERE id = {id}";
                DatabaseHelper.ExecuteQuery(query);
                LoadUsersData();
            }
            else
            {
                MessageBox.Show("Válassz ki egy sort a törléshez!");
            }
        }

        private void DeleteMessage_Click(object sender, RoutedEventArgs e)
        {
            if (messagesTable.SelectedItem is DataRowView row)
            {
                int id = Convert.ToInt32(row["id"]);
                string query = $"DELETE FROM messages WHERE id = {id}";
                DatabaseHelper.ExecuteQuery(query);
                LoadMessagesData();
            }
            else
            {
                MessageBox.Show("Válassz ki egy sort a törléshez!");
            }
        }

        private void DeleteBooking_Click(object sender, RoutedEventArgs e)
        {
            if (bookingsTable.SelectedItem is DataRowView row)
            {
                int id = Convert.ToInt32(row["id"]);
                string query = $"DELETE FROM bookings WHERE id = {id}";
                DatabaseHelper.ExecuteQuery(query);
                LoadBookingsData();
            }
            else
            {
                MessageBox.Show("Válassz ki egy sort a törléshez!");
            }
        }

        private void UsersGrid_SelectionChanged(object sender, System.Windows.Controls.SelectionChangedEventArgs e)
        {
            if (userTable.SelectedItem is DataRowView row)
            {
                tbId.Text = row["id"].ToString();
                tbName.Text = row["name"].ToString();
                tbEmail.Text = row["email"].ToString();
                tbPhoneNum.Text = row["phone_num"].ToString();
                tbPassword.Text = row["password"].ToString();
            }
        }

        private void BookingsGrid_SelectionChanged(object sender, System.Windows.Controls.SelectionChangedEventArgs e)
        {
            if (bookingsTable.SelectedItem is DataRowView row)
            {
                tbBookingsId.Text = row["id"].ToString();
                tbBookingsUserId.Text = row["user_id"].ToString();
                tbBookingsParkingId.Text = row["parking_space_id"].ToString();
                dpStartTime.Text = row["start_time"].ToString();
                dpEndTime.Text = row["end_time"].ToString();
                tbPlateNum.Text = row["plate_num"].ToString();
            }
        }

        private void UpdateUser_Click(object sender, RoutedEventArgs e)
        {
            string id = tbId.Text;
            string name = tbName.Text;
            string email = tbEmail.Text;
            string phoneNum = tbPhoneNum.Text;
            string password = tbPassword.Text;

            if (string.IsNullOrWhiteSpace(name) || string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(phoneNum) || string.IsNullOrWhiteSpace(password))
            {
                MessageBox.Show("Egyik mező sem lehet üres!");
                return;
            }

            string query = $"UPDATE users SET name = '{name}', email = '{email}', phone_num = '{phoneNum}', password = '{password}' WHERE id = {id}";
            DatabaseHelper.ExecuteQuery(query);
            LoadUsersData();
            ClearUsersFields();
            MessageBox.Show("Sikeres módosítás!");
        }

        private void UpdateBooking_Click(object sender, RoutedEventArgs e)
        {
            if (string.IsNullOrWhiteSpace(tbBookingsId.Text))
            {
                MessageBox.Show("Válassz ki egy sort a módosításhoz!");
                return;
            }

            int id = int.Parse(tbBookingsId.Text);
            int user_id = string.IsNullOrWhiteSpace(tbBookingsUserId.Text) ? 0 : int.Parse(tbBookingsUserId.Text);
            int parking_id = string.IsNullOrWhiteSpace(tbBookingsParkingId.Text) ? 0 : int.Parse(tbBookingsParkingId.Text);
            string start_time= dpStartTime.Text;
            string end_time = dpEndTime.Text;
            string plate_num = tbPlateNum.Text;

            if (user_id == 0 || parking_id == 0 || string.IsNullOrWhiteSpace(start_time) || string.IsNullOrWhiteSpace(end_time) || string.IsNullOrWhiteSpace(plate_num))
            {
                MessageBox.Show($"Egyik mező sem lehet üres!");
                return;
            }

            string query = $"UPDATE bookings SET user_id = '{user_id}', parking_space_id = '{parking_id}', start_time = '{start_time}', end_time = '{end_time}', plate_num = '{plate_num}' WHERE id = {id}";
            DatabaseHelper.ExecuteQuery(query);
            LoadBookingsData();
            ClearBookingsFields();
            MessageBox.Show("Sikeres módosítás!");
        }

        private void ClearUsersFields()
        {
            tbName.Clear();
            tbEmail.Clear();
            tbPhoneNum.Clear();
            tbPassword.Clear();
        }
        
        private void ClearBookingsFields()
        {
            tbBookingsId.Clear();
            tbBookingsUserId.Clear();
            tbBookingsParkingId.Clear();
            dpStartTime.Text = "";
            dpEndTime.Text = "";
            tbPlateNum.Clear();
        }

        private void ClearButton_Click(object sender, RoutedEventArgs e)
        {
            ClearUsersFields();
            ClearBookingsFields();
        }
    }
}