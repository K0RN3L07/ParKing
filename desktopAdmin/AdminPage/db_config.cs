using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using System.Data;
using System.Windows;

namespace AdminPage
{
    internal class db_config
    {
        public class DatabaseHelper
        {
            private const string connectionString = "Server=localhost;Database=parking;Uid=root;Pwd=;";

            public static DataTable GetData(string query)
            {
                DataTable dataTable = new DataTable();

                try
                {
                    using (MySqlConnection conn = new MySqlConnection(connectionString))
                    {
                        conn.Open();

                        using (MySqlCommand cmd = new MySqlCommand(query, conn))
                        {
                            using (MySqlDataAdapter adapter = new MySqlDataAdapter(cmd))
                            {
                                adapter.Fill(dataTable);
                            }
                        }
                    }
                }

                catch (MySqlException ex)
                {
                    // Hibakezelés MySQL-specifikus hibákhoz
                    //Console.WriteLine("MySQL hiba: " + ex.Message);
                    // Itt akár MessageBox is lehet, ha WPF-ben használod:
                    MessageBox.Show("Hiba az adatbázis elérésekor:\n\n" + ex.Message);
                }
                catch (Exception ex)
                {
                    // Egyéb hibák
                    //Console.WriteLine("Hiba: " + ex.Message);
                    MessageBox.Show("Hibaa:\n\n" + ex.Message);

                }

                return dataTable;
            }

            public static void ExecuteQuery(string query)
            {
                using (MySqlConnection conn = new MySqlConnection(connectionString))
                {
                    conn.Open();
                    MySqlCommand cmd = new MySqlCommand(query, conn);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}